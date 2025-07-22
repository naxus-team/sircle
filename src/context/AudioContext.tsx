import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef
} from "react";

type AudioContextType = {
  stream: MediaStream | null;
  isMuted: boolean;
  isMicOn: boolean;
  volumeLevel: number; // 👈 مؤشر الصوت
  toggleMute: () => void;
  toggleMic: () => void;
};

const MicContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0); // 👈
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const setupVolumeAnalyzer = (stream: MediaStream) => {
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    audioContextRef.current = audioCtx;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;
    sourceRef.current = source;

    const update = () => {
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const avg = dataArrayRef.current.reduce((a, b) => a + b, 0) / bufferLength;
        setVolumeLevel(avg / 255); // normalized between 0 and 1
      }
      requestAnimationFrame(update);
    };
    update();
  };

  const stopVolumeAnalyzer = () => {
    sourceRef.current?.disconnect();
    analyserRef.current?.disconnect();
    audioContextRef.current?.close();
    audioContextRef.current = null;
    analyserRef.current = null;
    dataArrayRef.current = null;
    sourceRef.current = null;
    setVolumeLevel(0);
  };

  const getMicStream = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(userStream);
      setIsMuted(false);
      setIsMicOn(true);
      setupVolumeAnalyzer(userStream);
    } catch (err) {
      console.error("Failed to access microphone:", err);
    }
  };

  useEffect(() => {
    getMicStream();
    return () => stopVolumeAnalyzer();
  }, []);

  const toggleMute = useCallback(() => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(prev => !prev);
    }
  }, [stream]);

  const toggleMic = useCallback(async () => {
    if (isMicOn) {
      stream?.getTracks().forEach(track => track.stop());
      stopVolumeAnalyzer();
      setStream(null);
      setIsMuted(false);
      setIsMicOn(false);
    } else {
      await getMicStream();
    }
  }, [isMicOn, stream]);

  return (
    <MicContext.Provider value={{ stream, isMuted, isMicOn, volumeLevel, toggleMute, toggleMic }}>
      {children}
    </MicContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(MicContext);
  if (!context) throw new Error("useAudio must be used within an AudioProvider");
  return context;
};
