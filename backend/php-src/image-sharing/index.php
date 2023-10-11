<?php
@date_default_timezone_set('Asia/Ho_Chi_Minh');
error_reporting(0);
header('response-id: 1');

if (@$_GET['f']) {
  chdir('./file_contents');
  header('Content-Type: application/octet-stream');
  header('Content-Disposition: attachment; filename='.base64_decode($_GET['f']));
  readfile(base64_decode($_GET['f']));
  exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  @mkdir('./file_contents',0777);
  $filename = $_SERVER['HTTP_X_FILE_NAME'];
  $post = explode(',', file_get_contents('php://input'));
  $enc_content = $post[1];
  $scheme = explode(':', $post[0]);
  $headers = explode(';', $scheme[1]);
  $scheme = $scheme[0];
  $content_type = array_shift($headers);
  $enctype = array_pop($headers);
  foreach($headers as $v) {
    $v = explode('=', $v);
    $k = $v[0];
    $v = $v[1];
    $$k = $v;
  }  if (!str_starts_with($content_type, 'image/') || str_ends_with($filename, '.php')) exit('Invalid file extension!');
  switch($enctype) {
    case 'base64': {
      file_put_contents('./file_contents/'.$filename, base64_decode($enc_content));
      break;
    }
    case 'gzip': {
    file_put_contents('./file_contents/'.$filename, gzdeflate($enc_content)/*shorter*/);
      break;
    }
  }

  echo '?f='.rawurlencode(base64_encode($filename));
  exit;
}
?>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!------ Include the above in your HEAD tag ---------->

<div class="container py-5">

  <!-- For demo purpose -->
  <header class="text-white text-center">
    <h1 class="display-4">Free Image Storage</h1>
    <p class="lead mb-0">Simple image upload your email and share with friend.</p>

    <img src="https://res.cloudinary.com/mhmd/image/upload/v1564991372/image_pxlho1.svg" alt="" width="150"
      class="mb-4">
  </header>


  <div class="row py-4">
    <div class="col-lg-6 mx-auto">

      <!-- Upload image input-->
      <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
        <input id="upload" accept="image/*" type="file" onchange="readURL(this);" class="form-control border-0">
        <label id="upload-label" for="upload" class="font-weight-light text-muted">Choose file</label>
        <div class="input-group-append">
          <label for="upload" class="btn btn-light m-0 rounded-pill px-4"> <i
              class="fa fa-cloud-upload mr-2 text-muted"></i><small
              class="text-uppercase font-weight-bold text-muted">Choose file</small></label>
        </div>
      </div>

      <!-- Uploaded image area-->
      <p class="font-italic text-white text-center">The image uploaded will be rendered inside the box below.</p>
      <div class="image-area mt-4"><a href="javascript:;" onclick="location.href=this.querySelector('img').src"><img
            id="imageResult" src="#" alt="" class="img-fluid rounded shadow-sm mx-auto d-block"></a></div>

    </div>
  </div>
</div>

<script>
  /*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
  function readURL(input) {
    if (input.files && input.files[0]) {
      if (input.files[0].size > 1024 * 1024 * 3) {
        input.value = ''
        return alert('File is too large (>3MB)')
      }
      var reader = new FileReader();

      reader.onerror = console.error
      reader.onload = function (e) {
        fetch('', {
          method: 'POST',
          headers: {
            'X-File-Name': input.files[0].name,
            authorization: localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : undefined
          },
          body: e.target.result
        }).then(r => r.text()).then(r => {
          $('#imageResult')
            .attr('src', r);
        }).catch(console.error)
        $('#imageResult')
          .attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $(function () {
    $('#upload').on('change', function () {
      readURL(input);
    });
  });

  /*  ==========================================
      SHOW UPLOADED IMAGE NAME
  * ========================================== */
  var input = document.getElementById('upload');
  var infoArea = document.getElementById('upload-label');

  input.addEventListener('change', showFileName);
  function showFileName(event) {
    var input = event.srcElement;
    var fileName = input.files[0].name;
    infoArea.textContent = 'File name: ' + fileName;
  }
</script>
<style>
  #upload {
    opacity: 0;
  }

  #upload-label {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }

  .image-area {
    border: 2px dashed rgba(255, 255, 255, 0.7);
    padding: 1rem;
    position: relative;
  }

  .image-area::before {
    content: 'Uploaded image result';
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    z-index: 1;
  }

  .image-area img {
    z-index: 2;
    position: relative;
  }

  body {
    min-height: 100vh;
    background-color: #757f9a;
    background-image: linear-gradient(147deg, #757f9a 0%, #d7dde8 100%);
  }
</style>