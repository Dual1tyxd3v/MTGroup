<?
//В переменную $token нужно вставить токен
$token = "5910914438:AAGnFKdoICio2rw007B1IItl7ovDFSpOpcs";

//Сюда вставляем chat_id
$chat_id = "-1001660934627";

//Определяем переменные для передачи данных из нашей формы
if ($_POST['phone']) {
    $phone = '%2b';
    $phone .= ($_POST['phone']);
    $name = ($_POST['name']);
    $email = ($_POST['email']);
    $location = ($_POST['location']);
    $message = ($_POST['message']);
    $place = ($_POST['place']);
    $width = ($_POST['width']);
    $height = ($_POST['height']);
    $length = ($_POST['length']);
    $when = ($_POST['when']);
    $consulting = ($_POST['consulting']);
    $city = ($_POST['address']);

//Собираем в массив то, что будет передаваться боту
    $arr = array(
        'Имя:' => $name,
        'Телефон:' => $phone,
        'E-mail:' => $email ? $email : '___',
        'Место встречи:' => $location ? $location : '___',
        'Сообщение:' => $message ? $message : '___',
        'Имеется место установки:' => $place ? $place : '___',
        'Когда нужен:' => $when ? $when : '___',
        'Консультация:' => $consulting ? $consulting : '___',
        'Адрес установки:' => $city ? $city : '___',
        'Размеры (ДхШхВ):' => $length ? $length."X".$width."X".$height : '___'
    );

//Настраиваем внешний вид сообщения в телеграме
    foreach($arr as $key => $value) {
        $txt .= "".$key." ".$value."%0A";
    };
    /* $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r"); */
    echo "1";

//Выводим сообщение об успешной отправке
    if ($sendToTelegram) {
        echo "1";
    }

//А здесь сообщение об ошибке при отправке
    else {
      echo "0";
    }
}

?>
