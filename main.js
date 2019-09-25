var app = new Vue({
  el: "#app",
  data: function() {
    return {
      recognition: new webkitSpeechRecognition(),
      status: "停止中",
      finalTranscript: "",
      interimTranscript: "",
      platform_name: ""
    };
  },
  methods: {
    startRec: function() {
      this.recognition.lang = "ja-JP";
      this.recognition.interimResults = true;
      this.recognition.continuous = true;
      this.recognition.start();
    },
    stopRec: function() {
      this.recognition.stop();
    },
    clearText: function() {
      this.finalTranscript = "";
    }
  },
  created: function() {
    this.recognition.onstart = () => {
      this.status = "録音開始...";
    };
    this.recognition.onend = () => {
      this.status = "停止中";
    };
    this.recognition.onresult = event => {
      this.status = "音声認識中...";
      if (event.results.length > 0) {
        let finalTranscript = ""; // 確定した認識結果
        let interimTranscript = ""; // 暫定の認識結果
        for (let i = event.resultIndex; i < event.results.length; i++) {
          let transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript = transcript;
          }
        }
        if (finalTranscript) {
          this.finalTranscript = this.finalTranscript + finalTranscript + " ";
        }
        this.interimTranscript = interimTranscript;
      }
    };
  }
});
