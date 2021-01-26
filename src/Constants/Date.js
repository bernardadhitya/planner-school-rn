import moment from 'moment';

const getDateStringInIndonesian = (date, simplified = false) => {
  const daysInIndonesia = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu'
  ];
  const monthsInIndonesia = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];
  const monthsInIndonesiaSimplified = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des'
  ];

  const time = moment(date).format('HH:mm')

  return `${daysInIndonesia[date.getDay()]}, ${date.getDate()} ${simplified ?monthsInIndonesiaSimplified[date.getMonth()] : monthsInIndonesia[date.getMonth()]} ${date.getFullYear()} ${simplified ? '' : `\t${time} WIB`}`;
}

export default getDateStringInIndonesian;