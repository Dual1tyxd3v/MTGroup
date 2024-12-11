<?
require_once('PHPMailer.php');
require_once('SMTP.php');
require_once('Exception.php');
//В переменную $token нужно вставить токен
$token = "5910914438:AAGnFKdoICio2rw007B1IItl7ovDFSpOpcs";

//Сюда вставляем chat_id
$chat_id = "-1001660934627";
$tempID = '968980307';

//Определяем переменные для передачи данных из нашей формы
if ($_POST['phone']) {
  $error = true;
  $secret = '6LcM1ZcqAAAAADP_-yRRiaXwgqbTNDSTd7Wz4NJM';
  if (!empty($_POST['g-recaptcha-response'])) {
    $curl = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, 'secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);
    $out = curl_exec($curl);
    curl_close($curl);
    $out = json_decode($out);
    if ($out->success == true) {
      $error = false;
    }
  }
  if ($error) {
    echo '{"message":"Не верная капча","isSuccess":"false"}';
    return;
  }

  $phone = '%2b';
  $mailPhone = '+';
  $mailPhone .= ($_POST['phone']);
  $phone .= ($_POST['phone']);
  $name = isset($_POST['name']) ? $_POST['name'] : '___';
  $email = isset($_POST['email']) ? $_POST['email'] : '___';
  $location = isset($_POST['location']) ? $_POST['location'] : '___';
  $message = isset($_POST['message']) ? $_POST['message'] : '___';
  $kind = isset($_POST['kind']) ? $_POST['kind'] : false;
  $kind_alt = isset($_POST['kind--alt']) ? $_POST['kind--alt'] : false;
  $width = isset($_POST['width']) ? $_POST['width'] : false;
  $square = isset($_POST['height']) ? $_POST['height'] : false;
  $length = isset($_POST['length']) ? $_POST['length'] : false;
  $ruler = isset($_POST['ruler']) ? $_POST['ruler'] : 'off';
  $city = isset($_POST['city']) ? $_POST['city'] : '___';
  $copy = isset($_POST['copy']) ? $_POST['copy'] : '___';
  $ceramic = isset($_POST['ceramic']) ? $_POST['ceramic'] : '';
  $electric = isset($_POST['electric']) ? $_POST['electric'] : '';
  $vitrag = isset($_POST['vitrag']) ? $_POST['vitrag'] : '';
  $board = isset($_POST['board']) ? $_POST['board'] : '';
  $lamination = isset($_POST['lamination']) ? $_POST['lamination'] : '';
  $corners = isset($_POST['corners']) ? $_POST['corners'] : '';

  $dimensions = '___';
  $squareResult = '___';
  $add = implode(
    ', ',
    array_filter([$electric, $vitrag, $board, $lamination, $corners, $ceramic], function ($el) {
      return !empty($el);
    })
  );
  $type = '___';
  if ($kind_alt) {
    $type = $kind_alt;
  }
  if ($kind) {
    $type = $kind;
  }

  if ($length) {
    $dimensions = $length . "X" . $width;
    $squareResult = $length * $width;
  }

  if ($ruler === 'on') {
    $dimensions = 'Нужен замер';
  }

  //Собираем в массив то, что будет передаваться боту
  $arr = array(
    'Имя:' => $name,
    'Телефон:' => $phone,
    'E-mail:' => $email ? $email : '___',
    'Место встречи:' => $location,
    'Сообщение:' => $message ? $message : '___',
    'Тип объекта:' => $type,
    'Адрес установки:' => $city,
    'Размеры (ДхШ):' => $dimensions,
    'Площадь:' => $square ? $square : $squareResult,
    'Нужен похожий на:' => $copy,
    'Доп. услуги:' => $add ? $add : '___'
  );

  //Настраиваем внешний вид сообщения в телеграме
  $txt = '';
  $mailTxt = '';
  foreach ($arr as $key => $value) {
    $txt .= "" . $key . " " . $value . "%0A";
    $mailTxt .= "<p>" . $key . " " . str_replace('%2b', '+', $value) . "</p>";
  };
  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$tempID}&parse_mode=html&text={$txt}", "r");

  $mail = new PHPMailer\PHPMailer\PHPMailer();
  $mail->isSMTP();
  $mail->Host         = 'mail.modul-tehno.ru';
  $mail->SMTPAuth     = true;
  $mail->Username     = 'info@modul-tehno.ru';
  $mail->Password     = 'modul123456789';
  $mail->SMTPSecure   = 'TLS';
  $mail->Port         = 587;

  $mail->CharSet = 'UTF-8';
  $mail->From = 'info@modul-tehno.ru';
  $mail->FromName = 'info@modul-tehno.ru';
  $mail->addAddress('info@modul-tehno.ru');
  $mail->addAddress('modul-litvinoff@yandex.ru');

  $mail->isHTML(true);
  $mail->Subject = 'Заявки с сайта';
  $mail->msgHTML("<html><body>" . $mailTxt . "</html></body>");

  if ($sendToTelegram) {
    echo '{"message":"Сообщение отправлено","isSuccess":"true"}';
  } else {
    echo '{"message":"Ошибка. Попробуйте позже :(","isSuccess":"false"}';
  }
  /* if ($mail->send() && $sendToTelegram) {
    echo '{"message":"Сообщение отправлено","isSuccess":"true"}';
  } else {
    echo '{"message":"Ошибка. Попробуйте позже :(","isSuccess":"false"}';
  } */
}
