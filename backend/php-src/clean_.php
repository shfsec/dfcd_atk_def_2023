<?php
if (php_sapi_name() !== 'cli') exit;
// implement: https://lists.w3.org/Archives/Public/uri/2010Feb/0069.html
do {
  sleep(2*60);

  $pids = scandir('/proc/');
  foreach($pids as $pid) {
    if (preg_match('#[^\d]#', $pid)) continue;
    $cmdline = file_get_contents("/proc/{$pid}/cmdline");
    if ($pid === '1') {
      echo 'clean: ', $cmdline, '(', $pid, ')', PHP_EOL;
      continue;
    }
    #Todo: check /proc/*/exe
    if (preg_match('#^apache2[\s\x00]-DFOREGROUND[\s\x00]*#', $cmdline)) {
      echo 'clean: ', $cmdline, '(', $pid, ')', PHP_EOL;
      continue;
    }

    if (preg_match('#^/proxy[\s\x00]*#', $cmdline)) {
      echo 'clean: ', $cmdline, '(', $pid, ')', PHP_EOL;
      continue;
    }

    if (preg_match('#^/usr/local/bin/php[\s\x00]/var/www/html/clean\?.php[\s\x00]*#', $cmdline)) {
      echo 'clean: ', $cmdline, '(', $pid, ')', PHP_EOL;
      continue;
    }

    echo 'kill: ', $cmdline, '(', $pid, ')', PHP_EOL;
    system('kill -9 '.$pid);
    echo 'killed: ', $cmdline, '(', $pid, ')', PHP_EOL;
  }


}while(true);