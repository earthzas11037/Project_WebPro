function getParsedDate(strDate) {
    var strSplitDate = String(strDate).split(' ');

    var date = new Date(strDate);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    var Hours = date.getHours();
    var Minutes = date.getUTCMinutes();
    var Seconds = date.getUTCSeconds();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (Seconds < 10) {
        Seconds = '0' + Seconds;
    }
    if (Hours < 10) {
        Hours = '0' + Hours;
    }
    if (Minutes < 10) {
        Minutes = '0' + Minutes;
    }

    date = Hours + ":" + Minutes + ":" + Seconds;
    return date.toString();
}

export {
    getParsedDate
  }