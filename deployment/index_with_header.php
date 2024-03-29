<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
?>

<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta httpequiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport"
    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1.00001,viewport-fit=cover" />
  <title>Chat Service</title>
  <link rel="icon" type="image/png" href="https://r1.userto.com/img/Chat_Bubbles@2x_fb.png">
  <style>
    #root,
    body,
    html {
      width: 100%;
      -webkit-overflow-scrolling: touch;
      margin: 0;
      padding: 0;
      min-height: 100%
    }

    #root {
      flex-shrink: 0;
      flex-basis: auto;
      flex-grow: 1;
      display: flex;
      flex: 1
    }

    html {
      scroll-behavior: smooth;
      -webkit-text-size-adjust: 100%;
      height: calc(100% + env(safe-area-inset-top))
    }

    body {
      display: flex;
      overflow-y: auto;
      overscroll-behavior-y: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -ms-overflow-style: scrollbar
    }
  </style>
  <link rel="manifest" href="manifest.json">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-touch-fullscreen" content="yes">
  <meta name="apple-mobile-web-app-title" content="javascript-react-chat-app">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <!-- <script defer="defer" src="./static/js/bundle.min.js.gz"></script>
  <script defer="defer" src="./static/js/main.bundle.min.js.gz"></script> -->
  <script defer="defer" src="https://r1.userto.com/static/js/bundle.min.js.gz"></script>
  <script defer="defer" src="https://r1.userto.com/static/js/main.bundle.min.js.gz"></script>
</head>

<body><noscript>
    <form action="" style="background-color:#fff;position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999">
      <div style="font-size:18px;font-family:Helvetica,sans-serif;line-height:24px;margin:10%;width:80%">
        <p>Oh no! It looks like JavaScript is not enabled in your browser.</p>
        <p style="margin:20px 0"><button type="submit"
            style="background-color:#4630eb;border-radius:100px;border:none;box-shadow:none;color:#fff;cursor:pointer;font-weight:700;line-height:20px;padding:6px 16px">Reload</button>
        </p>
      </div>
    </form>
  </noscript>
  <div id="root"></div>
</body>

</html>