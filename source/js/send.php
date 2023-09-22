<?
require_once('PHPMailer.php');
require_once('SMTP.php');
require_once('Exception.php');
//В переменную $token нужно вставить токен
$token = "5910914438:AAGnFKdoICio2rw007B1IItl7ovDFSpOpcs";

//Сюда вставляем chat_id
$chat_id = "-1001660934627";

//Определяем переменные для передачи данных из нашей формы
if ($_POST['phone']) {
    $phone = '%2b';
    $mailPhone = '+';
    $mailPhone .= ($_POST['phone']);
    $phone .= ($_POST['phone']);
    $name = ($_POST['name']);
    $email = ($_POST['email']);
    $location = ($_POST['location']);
    $message = ($_POST['message']);
    $kind = ($_POST['kind']);
    $kind_alt = ($_POST['kind--alt']);
    $width = ($_POST['width']);
    $height = ($_POST['height']);
    $length = ($_POST['length']);
    $ruler = ($_POST['ruler']);
    $when = ($_POST['when']);
    $city = ($_POST['address']);
    $place = ($_POST['place']);
    $copy = ($_POST['copy']);
    $ceramic = ($_POST['ceramic']);
    $electric = ($_POST['electric']);
    $vitrag = ($_POST['vitrag']);
    $board = ($_POST['board']);
    $lamination = ($_POST['lamination']);
    $corners = ($_POST['corners']);
    $dimensions = '___';
    $add = implode(', ',
      array_filter([$electric, $vitrag, $board, $lamination, $corners, $ceramic], function($el) {
        return !empty($el);
      })
    );
    $type = $kind_alt ? $kind_alt : $kind;

    if ($length) {
      $dimensions = $length."X".$width."X".$height;
    }

    if ($ruler === 'on') {
      $dimensions = 'Нужен замер';
    }

//Собираем в массив то, что будет передаваться боту
    $arr = array(
        'Имя:' => $name,
        'Телефон:' => $phone,
        'E-mail:' => $email ? $email : '___',
        'Место встречи:' => $location ? $location : '___',
        'Сообщение:' => $message ? $message : '___',
        'Тип объекта:' => $type ? $type : '___',
        'Имеется место установки:' => $place ? $place : '___',
        'Когда нужен:' => $when ? $when : '___',
        'Адрес установки:' => $city ? $city : '___',
        'Размеры (ДхШхВ):' => $dimensions,
        'Нужен похожий на:' => $copy ? $copy : '___',
        'Доп. услуги:' => $add ? $add : '___'
    );

//Настраиваем внешний вид сообщения в телеграме
    foreach($arr as $key => $value) {
        $txt .= "".$key." ".$value."%0A";
        $mailTxt .= "<p>".$key." ".str_replace('%2b', '+', $value)."</p>";
    };
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

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

      $mail->isHTML(true);
      $mail->Subject = 'Заявки с сайта';
      $mail->msgHTML("<html><body>".$mailTxt."</html></body>");

      if($mail->send() && $sendToTelegram) {
          echo "1";
      }
      else{
          echo "0";
      }
}

?>
