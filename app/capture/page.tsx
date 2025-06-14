"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { BrutalistButton } from "@/components/ui/brutalist-button"
import { BrutalistCard, BrutalistCardContent } from "@/components/ui/brutalist-card"
import {
  Camera,
  Upload,
  RotateCcw,
  X,
  FlashlightOffIcon as FlashOff,
  FlashlightIcon as Flash,
  Square,
} from "lucide-react"
import Link from "next/link"
import { BrutalistBottomNavigation } from "@/components/brutalist-bottom-nav"
import { BrutalistLoading } from "@/components/brutalist-loading"
import { analyzeImageWithVisionAI } from "@/lib/novita-ai";

export default function BrutalistCapturePage() {
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [flashEnabled, setFlashEnabled] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [isLoadingCamera, setIsLoadingCamera] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const enumerateCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        setVideoDevices(videoInputs);

        if (videoInputs.length === 0) {
          setCameraError("No camera devices found.");
        }
      } catch (err) {
        console.error("Error enumerating devices:", err);
        setCameraError("Failed to enumerate camera devices.");
      }
    };

    enumerateCameras();
  }, []);

  useEffect(() => {
    const enableStream = async () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      setMediaStream(null);
      setCameraError(null);
      setIsLoadingCamera(true);

      try {
        console.log(`Attempting to get camera stream with facingMode: ${facingMode}`);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
        });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraError(null);
      } catch (err) {
        console.error("Error accessing camera:", err);
        if ((err as DOMException).name === "NotAllowedError") {
          setCameraError("Camera access denied. Please allow camera permissions in your browser settings.");
        } else if ((err as DOMException).name === "NotFoundError") {
          setCameraError("No camera found. Please ensure a camera is connected.");
        } else {
          setCameraError(`Failed to access camera: ${(err as Error).message || "Unknown error"}.`);
        }
      } finally {
        setIsLoadingCamera(false);
      }
    };

    if (!capturedImage) {
      enableStream();
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        setMediaStream(null);
      }
    };
  }, [capturedImage, facingMode]);

  const handleToggleCamera = useCallback(() => {
    setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
  }, []);

  const handleCameraCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      setIsCapturing(true);
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageBase64 = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageBase64);
        setAnalysisResult(null);
        setIsCapturing(false);

        if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
          setMediaStream(null);
        }
      }
    }
  }, [mediaStream]);

  const handleFileUpload = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
        setAnalysisResult(null);
        if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
          setMediaStream(null);
        }
      }
      reader.readAsDataURL(file)
    }
  }, [mediaStream])

  const handleRetake = useCallback(() => {
    setCapturedImage(null)
    setAnalysisResult(null);
    setCameraError(null);
    setIsLoadingCamera(true);
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
    setTimeout(() => setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user'), 0);
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (capturedImage) {
      setIsAnalyzing(true);
      setAnalysisResult(null);
      const result = await analyzeImageWithVisionAI(capturedImage);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }
  }, [capturedImage])

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black text-white brutalist-border-thin border-white/20 border-t-0 border-l-0 border-r-0 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <BrutalistButton variant="ghost" size="sm" className="text-white border-white/20 hover:bg-white/10">
                <X className="w-5 h-5" />
              </BrutalistButton>
            </Link>
            <h1 className="brutalist-title text-xl">CAPTURE FOOD</h1>
            <BrutalistButton
              variant="ghost"
              size="sm"
              className="text-white border-white/20 hover:bg-white/10"
              onClick={() => setFlashEnabled(!flashEnabled)}
            >
              {flashEnabled ? <Flash className="w-5 h-5" /> : <FlashOff className="w-5 h-5" />}
            </BrutalistButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {!capturedImage ? (
          <div className="space-y-6">
            {/* Camera Viewfinder */}
            <BrutalistCard className="bg-gray-900 border-white/20">
              <BrutalistCardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 brutalist-border border-white/20 flex items-center justify-center relative overflow-hidden">
                  {isCapturing ? (
                    <BrutalistLoading size="lg" text="CAPTURING FOOD..." />
                  ) : cameraError ? (
                    <div className="text-center text-red-500">
                      <p className="brutalist-title text-xl mb-2">CAMERA ERROR</p>
                      <p className="brutalist-body text-sm px-4">{cameraError}</p>
                    </div>
                  ) : isLoadingCamera ? (
                    <BrutalistLoading size="lg" text="LOADING CAMERA..." />
                  ) : videoDevices.length === 0 ? (
                    <div className="text-center text-gray-400">
                      <p className="brutalist-title text-xl mb-2">NO CAMERA DETECTED</p>
                      <p className="brutalist-body text-sm px-4">Please ensure a camera is connected and permissions are granted.</p>
                    </div>
                  ) : (
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
                  )}

                  {/* Camera Guidelines */}
                  {!cameraError && !isCapturing && videoDevices.length > 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-white/30"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 brutalist-border border-white"></div>
                    </div>
                  )}
                </div>
              </BrutalistCardContent>
            </BrutalistCard>

            {/* Camera Controls */}
            <div className="flex justify-center items-center space-x-8">
              <BrutalistButton
                variant="outline"
                size="lg"
                onClick={handleFileUpload}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-16 h-16 p-0"
                disabled={isCapturing || !!cameraError || isLoadingCamera}
              >
                <Upload className="w-6 h-6" />
              </BrutalistButton>

              <BrutalistButton
                size="xl"
                onClick={handleCameraCapture}
                disabled={isCapturing || !mediaStream || !!cameraError || isLoadingCamera}
                variant="accent"
                className="w-24 h-24 p-0 brutalist-shadow-lg"
              >
                <Camera className="w-10 h-10" />
              </BrutalistButton>

              <BrutalistButton
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-16 h-16 p-0"
                onClick={handleToggleCamera}
                disabled={isCapturing || !!cameraError || videoDevices.length <= 1 || isLoadingCamera}
              >
                <RotateCcw className="w-6 h-6" />
              </BrutalistButton>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            {/* Tips */}
            <BrutalistCard className="bg-white/5 border-white/10">
              <BrutalistCardContent className="p-6">
                <h3 className="brutalist-subtitle text-white mb-4">CAPTURE TIPS:</h3>
                <ul className="text-gray-300 brutalist-body space-y-2">
                  <li>• ENSURE GOOD LIGHTING</li>
                  <li>• CENTER FOOD IN FRAME</li>
                  <li>• AVOID SHADOWS</li>
                  <li>• CAPTURE ENTIRE MEAL</li>
                </ul>
              </BrutalistCardContent>
            </BrutalistCard>
          </div>
        ) : (
          <div className="space-y-6">
            <BrutalistCard className="bg-gray-900 border-white/20">
              <BrutalistCardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img src={capturedImage} alt="Captured Food" className="w-full h-full object-cover" />
                </div>
              </BrutalistCardContent>
            </BrutalistCard>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <BrutalistButton
                variant="outline"
                onClick={handleRetake}
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                disabled={isAnalyzing}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                RETAKE
              </BrutalistButton>

              <BrutalistButton onClick={handleAnalyze} variant="accent" className="flex-1" disabled={isAnalyzing}>
                {isAnalyzing ? "ANALYZING..." : "ANALYZE FOOD"}
              </BrutalistButton>
            </div>

            {analysisResult && (
              <BrutalistCard className="bg-green-900/20 border-green-500/20">
                <BrutalistCardContent className="p-6 text-center">
                  <h3 className="brutalist-subtitle text-green-400 mb-2">ANALYSIS RESULT:</h3>
                  <p className="brutalist-body text-green-400">
                    {analysisResult}
                  </p>
                </BrutalistCardContent>
              </BrutalistCard>
            )}

            {!analysisResult && !isAnalyzing && (
              <BrutalistCard className="bg-green-900/20 border-green-500/20">
                <BrutalistCardContent className="p-6 text-center">
                  <p className="brutalist-body text-green-400">
                    GREAT SHOT! AI WILL ANALYZE THIS IMAGE FOR NUTRITION DATA.
                  </p>
                </BrutalistCardContent>
              </BrutalistCard>
            )}
          </div>
        )}
      </div>

      <BrutalistBottomNavigation />
    </div>
  )
}
