// src/utils/webcam.ts

// دالة لتشغيل الكاميرا الويب
export const startWebcam = async (videoElement: HTMLVideoElement): Promise<void> => {
    try {
      // طلب الوصول إلى الكاميرا
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true, // تفعيل الفيديو
        audio: false, // تعطيل الصوت (يمكن تفعيله إذا لزم الأمر)
      });
  
      // ربط التدفق بعنصر الفيديو
      if (videoElement) {
        videoElement.srcObject = stream;
        videoElement.play(); // تشغيل الفيديو تلقائيًا
      }
    } catch (error) {
      console.error('خطأ في تشغيل الكاميرا:', error);
      throw error; // إعادة رمي الخطأ للتعامل معه في المكون
    }
  };
  
  // دالة لإيقاف الكاميرا الويب
  export const stopWebcam = (videoElement: HTMLVideoElement): void => {
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop()); // إيقاف جميع المسارات
      videoElement.srcObject = null; // إزالة التدفق
    }
  };