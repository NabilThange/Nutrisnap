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
  Zap,
  Brain,
  Plus,
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
  const currentStreamRef = useRef<MediaStream | null>(null);

  const handleToggleFlash = useCallback(async () => {
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0];
      if (videoTrack) {
        try {
          const capabilities = videoTrack.getCapabilities();
          if ('torch' in capabilities) {
            await videoTrack.applyConstraints({ advanced: [{ torch: !flashEnabled } as any] }); // Explicitly cast to any for torch property
            setFlashEnabled(prev => !prev);
          } else {
            console.warn("Torch (flashlight) not supported by this camera.");
          }
        } catch (err) {
          console.error("Error toggling flashlight:", err);
        }
      }
    }
  }, [mediaStream, flashEnabled]);

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
      // Stop any previously active stream from this effect
      if (currentStreamRef.current) {
        console.log("Stopping previous stream tracks...");
        currentStreamRef.current.getTracks().forEach(track => track.stop());
        currentStreamRef.current = null;
      }

      setMediaStream(null); // Clear state
      setCameraError(null);
      setIsLoadingCamera(true);

      try {
        console.log(`Attempting to get camera stream with facingMode: ${facingMode}`);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
        });
        currentStreamRef.current = stream; // Store the new stream in the ref
        setMediaStream(stream); // Update state
        console.log("Newly acquired MediaStream:", stream);
        stream.getTracks().forEach(track => {
          console.log(`Track ID: ${track.id}, Kind: ${track.kind}, ReadyState: ${track.readyState}, Enabled: ${track.enabled}`);
        });

        if (videoRef.current) {
          console.log("videoRef.current is available.", videoRef.current);
          videoRef.current.srcObject = stream;
          // Attempt to play the video and handle the returned Promise
          const playPromise = videoRef.current.play();

          if (playPromise !== undefined) {
            playPromise.then(() => {
              console.log("Camera stream successfully set and playing on video element.");
              console.log("Video element paused:", videoRef.current?.paused, "readyState:", videoRef.current?.readyState);
            }).catch((playError) => {
              console.error("Error playing video stream:", playError);
              setCameraError("Failed to play camera stream. Please ensure nothing else is using the camera or try refreshing.");
            });
          } else {
            console.log("videoRef.current.play() returned undefined, assuming it's playing or not requiring a promise.");
            console.log("Video element paused:", videoRef.current?.paused, "readyState:", videoRef.current?.readyState);
          }
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
      // Cleanup function: stop the stream that *this* effect's current run created
      if (currentStreamRef.current) {
        console.log("Stopping stream in useEffect cleanup.");
        currentStreamRef.current.getTracks().forEach(track => track.stop());
        currentStreamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null; // Clear the video element
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
        localStorage.setItem("capturedImage", imageBase64);
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
    setFacingMode('user'); // Reset to user-facing camera on retake
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (capturedImage) {
      setIsAnalyzing(true);
      setAnalysisResult(null);
      const result = await analyzeImageWithVisionAI(capturedImage);
      setAnalysisResult(result);
      if (result) {
        localStorage.setItem("qwenAnalysisResult", result);
      }
      setIsAnalyzing(false);
      // Redirect to /recognize page after analysis
      window.location.href = "/recognize";
    }
  }, [capturedImage])

  useEffect(() => {
    if (capturedImage) {
      handleAnalyze();
    }
  }, [capturedImage, handleAnalyze]);

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
              onClick={handleToggleFlash}
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
                <div className="aspect-square bg-transparent brutalist-border border-white/20 flex items-center justify-center relative overflow-hidden">
                  {/* Video Element - Always mounted when no image captured */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover z-10 border-4 border-red-500 ${ (isCapturing || cameraError || isLoadingCamera || videoDevices.length === 0) ? 'hidden' : ''}`}
                  ></video>

                  {/* Overlays for different states */}
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
                  ) : null /* No overlay when camera is active and ready */}

                  {/* Camera Guidelines */}
                  {!cameraError && !isCapturing && videoDevices.length > 0 && (
                    <div className="absolute inset-0 pointer-events-none z-20">
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
                disabled={isCapturing || !!cameraError}
              >
                <Upload className="w-6 h-6" />
              </BrutalistButton>

              <BrutalistButton
                size="xl"
                onClick={handleCameraCapture}
                disabled={isCapturing || !mediaStream || !!cameraError}
                variant="accent"
                className="w-24 h-24 p-0 brutalist-shadow-lg"
              >
                <Camera className="w-10 h-10" />
              </BrutalistButton>

              {videoDevices.length > 1 && (
                <BrutalistButton
                  variant="outline"
                  size="lg"
                  onClick={handleToggleCamera}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-16 h-16 p-0"
                  disabled={isCapturing || !!cameraError}
                >
                  <RotateCcw className="w-6 h-6" />
                </BrutalistButton>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Captured Image Display */}
            <BrutalistCard className="bg-gray-900 border-white/20">
              <BrutalistCardContent className="p-0">
                <div className="aspect-square brutalist-border border-white/20 flex items-center justify-center relative overflow-hidden">
                  <img src={capturedImage} alt="Captured Food" className="w-full h-full object-cover" />
                </div>
              </BrutalistCardContent>
            </BrutalistCard>

            {/* Image Action Buttons */}
            <div className="flex justify-center items-center space-x-8">
              <BrutalistButton
                variant="outline"
                size="lg"
                onClick={handleRetake}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-16 h-16 p-0"
              >
                <RotateCcw className="w-6 h-6" />
              </BrutalistButton>

              <BrutalistButton
                size="xl"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                variant="accent"
                className="w-24 h-24 p-0 brutalist-shadow-lg"
              >
                {isAnalyzing ? (
                  <span className="animate-pulse">
                    <Zap className="w-10 h-10" />
                  </span>
                ) : (
                  <Brain className="w-10 h-10" />
                )}
              </BrutalistButton>

              <BrutalistButton
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-16 h-16 p-0"
              >
                <Plus className="w-6 h-6" />
              </BrutalistButton>
            </div>

            {analysisResult && (
              <div className="mt-6 space-y-4 brutalist-fade-in">
                <h2 className="brutalist-title text-xl text-white">AI ANALYSIS:</h2>
                <BrutalistCard className="bg-gray-800 border-white/20 text-white">
                  <BrutalistCardContent className="p-4 sm:p-6 brutalist-body text-sm">{analysisResult}</BrutalistCardContent>
                </BrutalistCard>
              </div>
            )}
          </div>
        )}
      </div>
      <BrutalistBottomNavigation />
    </div>
  )
}