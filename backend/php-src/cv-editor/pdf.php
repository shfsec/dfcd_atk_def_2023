<?php
@date_default_timezone_set('Asia/Ho_Chi_Minh');

if ($_SERVER['REQUEST_METHOD'] !== 'POST'  || empty($_FILES)) exit;

$id = uniqid();
$file = array_pop($_FILES);
$html_file_name = 'files/'.$id.$file['name'];
move_uploaded_file($file['tmp_name'], $html_file_name);

file_put_contents($html_file_name, str_replace('<head>', <<<DOC
<head><base href="http://127.0.0.1/cv-editor/"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
DOC, file_get_contents($html_file_name)));

$filepath = 'files/'.$id.'.pdf';

$descriptors = array(
  0 => array("pipe", "r"),  // STDIN
  1 => array("pipe", "w"),  // STDOUT
  2 => array("pipe", "w")   // STDERR
);


/*
dpkg -i libssl1.1_1.1.0g-2ubuntu4_amd64.deb
apt install libx11-6 libxext6 libfreetype6 libfontconfig1 libxrender1 libjpeg62-turbo
*/
$proc = proc_open('cat "'.$html_file_name.'" | timeout 7 "'.__DIR__.'/wkhtmltopdf" - "'.$filepath.'"', $descriptors, $pipes);
// fwrite($pipes[0], $c);
fclose($pipes[0]);

$stdout = stream_get_contents($pipes[1]);
$stderr = stream_get_contents($pipes[2]);

file_put_contents('php://stdout', $stdout);
file_put_contents('php://stderr', $stderr);

fclose($pipes[1]);
fclose($pipes[2]);

$exitCode = proc_close($proc);

echo $filepath;