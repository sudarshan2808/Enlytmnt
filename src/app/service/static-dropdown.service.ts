import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticDropdownService {

  constructor() { }

  SpokenData = [
    {
      id: 'English',
      name: 'English',
    },
    {
      id: 'Hindi',
      name: 'Hindi',
    },
    {
      id: 'Bengali',
      name: 'Bengali',
    },
    {
      id: 'Marathi',
      name: 'Marathi',
    },
    {
      id: 'Telugu',
      name: 'Telugu',
    },
    {
      id: 'Tamil',
      name: 'Tamil',
    },
    {
      id: 'Gujarati',
      name: 'Gujarati',
    },
    {
      id: 'Urdu',
      name: 'Urdu',
    },
    {
      id: 'Kannada',
      name: 'Kannada',
    },
    {
      id: 'Odia',
      name: 'Odia',
    },
    {
      id: 'Malayalam',
      name: 'Malayalam',
    },
    {
      id: 'Punjabi',
      name: 'Punjabi',
    },
    {
      id: 'Assamese',
      name: 'Assamese',
    },
    {
      id: 'Maithili',
      name: 'Maithili',
    },
    {
      id: 'Bhili/Bhilodi',
      name: 'Bhili/Bhilodi',
    },
    {
      id: 'Santali',
      name: 'Santali',
    },
    {
      id: 'Kashmiri',
      name: 'Kashmiri',
    },
    {
      id: 'Gondi',
      name: 'Gondi',
    },
    {
      id: 'Nepali',
      name: 'Nepali',
    },
    {
      id: 'Sindhi',
      name: 'Sindhi',
    },
    {
      id: 'Dogri',
      name: 'Dogri',
    },
    {
      id: 'Konkani',
      name: 'Konkani',
    },
    {
      id: 'Kurukh',
      name: 'Kurukh',
    },
    {
      id: 'Khandeshi',
      name: 'Khandeshi',
    },
    {
      id: 'Tulu',
      name: 'Tulu',
    },
    {
      id: 'Meitei (Manipuri)',
      name: 'Meitei (Manipuri)',
    },
    {
      id: 'Bodo',
      name: 'Bodo',
    },
    {
      id: 'Khasi',
      name: 'Khasi',
    },
    {
      id: 'Ho',
      name: 'Ho',
    },
    {
      id: 'Garo',
      name: 'Garo',
    },
    {
      id: 'Mundari',
      name: 'Mundari',
    },
    {
      id: 'Tripuri',
      name: 'Tripuri',
    },
    
  ];

  DegreeData=[
    {
      id:'BBA- Bachelor of Business Administration',
      name:'BBA- Bachelor of Business Administration'
    },
    {
      id:'BMS- Bachelor of Management Science',
      name:'BMS- Bachelor of Management Science'
    },
    {
      id:'BFA- Bachelor of Fine Arts',
      name:'BFA- Bachelor of Fine Arts'
    },
    {
      id:'BEM- Bachelor of Event Management',
      name:'BEM- Bachelor of Event Management'
    },
    {
      id:'BJMC- Bachelor of Journalism and Mass Communication',
      name:'BJMC- Bachelor of Journalism and Mass Communication'
    },{
      id:'BFD- Bachelor of Fashion Designing',
      name:'BFD- Bachelor of Fashion Designing'
    },
    {
      id:'BSW- Bachelor of Social Work',
      name:'BSW- Bachelor of Social Work'
    },
    {
      id:'BBS- Bachelor of Business Studies',
      name:'BBS- Bachelor of Business Studies'
    },
    {
      id:'BTTM- Bachelor of Travel and Tourism Management',
      name:'BTTM- Bachelor of Travel and Tourism Management'
    },

    {
      id:'B.Sc- Interior Design',
      name:'B.Sc- Interior Design'
    },
    {
      id:'B.Sc.- Hospitality and Hotel Administration',
      name:'B.Sc.- Hospitality and Hotel Administration'
    },
    {
      id:'Bachelor of Design (B. Design)',
      name:'Bachelor of Design (B. Design)'
    },
    {
      id:'Bachelor of Performing Arts',
      name:'Bachelor of Performing Arts'
    },
    {
      id:'BA in History',
      name:'BA in History'
    },
    {
      id:'BE/B.Tech- Bachelor of Technology',
      name:'BE/B.Tech- Bachelor of Technology'
    },
    {
      id:'B.Arch- Bachelor of Architecture',
      name:'B.Arch- Bachelor of Architecture'
    },

    {
      id:'BCA- Bachelor of Computer Applications',
      name:'BCA- Bachelor of Computer Applications'
    },
    {
      id:'B.Sc.- Information Technology',
      name:'B.Sc.- Information Technology'
    },
    {
      id:'B.Sc- Nursing',
      name:'B.Sc- Nursing'
    },
    {
      id:'BPharma- Bachelor of Pharmacy',
      name:'BPharma- Bachelor of Pharmacy'
    },
    {
      id:'BDS- Bachelor of Dental Surgery',
      name:'BDS- Bachelor of Dental Surgery'
    },
    {
      id:'B.Sc. – Nutrition & Dietetics',
      name:'B.Sc. – Nutrition & Dietetics'
    },
    {
      id:'BPT- Bachelor of Physiotherapy',
      name:'BPT- Bachelor of Physiotherapy'
    },
    {
      id:'B.Sc- Applied Geology',
      name:'B.Sc- Applied Geology'
    },
    {
      id:'BA/B.Sc. Liberal Arts',
      name:'BA/B.Sc. Liberal Arts'
    },
    {
      id:'B.Sc.- Physics',
      name:'B.Sc.- Physics'
    },

    {
      id:'B.Sc. Chemistry',
      name:'B.Sc. Chemistry'
    },{
      id:'B.Sc. Mathematics',
      name:'B.Sc. Mathematics'
    },
    {
      id:'Engineering',
      name:'Engineering'
    },
    {
      id:'B.Com- Bachelor of Commerce',
      name:'B.Com- Bachelor of Commerce'
    },
    {
      id:'B.Com (Hons.)',
      name:'B.Com (Hons.)'
    },
    {
      id:'BA (Hons.) in Economics',
      name:'BA (Hons.) in Economics'
    },
    {
      id:'Integrated Law Program- B.Com LL.B.',
      name:'Integrated Law Program- B.Com LL.B.'
    },
    {
      id:'Integarted Law Program- BBA LL.B',
      name:'Integarted Law Program- BBA LL.B'
    },
    {
      id:'CA- Chartered Accountancy',
      name:'CA- Chartered Accountancy'
    },
    {
      id:'CS- Company Secretary',
      name:'CS- Company Secretary'
    },
    {
      id:'fashion Design',
      name:'fashion Design'
    },
    {
      id:'Graphic Design',
      name:'Graphic Design'
    },
    {
      id:'Master of Law (LL.M)',
      name:'Master of Law (LL.M)'
    },
    {
      id:'Master of Arts (M.A)',
      name:'Master of Arts (M.A)'
    },
    {
      id:'Master of Arts in Management (M.A.M)',
      name:'Master of Arts in Management (M.A.M)'
    },
    {
      id:'Master of Arts in Personal Management (M.A.P.M)',
      name:'Master of Arts in Personal Management (M.A.P.M)'
    },
    {
      id:'Master of Architecture (M.Arch)',
      name:'Master of Architecture (M.Arch)'
    },
    {
      id:'Master of Business Administration (M.B.A)',
      name:'Master of Business Administration (M.B.A)'
    },
    {
      id:'Master of Business Economics (M.B.E)',
      name:'Master of Business Economics (M.B.E)'
    },
    {
      id:'Master of Business Laws (M.B.L)',
      name:'Master of Business Laws (M.B.L)'
    },
    {
      id:'Master of Business Management (M.B.M)',
      name:'Master of Business Management (M.B.M)'
    },
    {
      id:'Master of Business Studies (M.B.S)',
      name:'Master of Business Studies (M.B.S)'
    },
    {
      id:'Master of Computer Applications (M.C.A)',
      name:'Master of Computer Applications (M.C.A)'
    },
    {
      id:'Master of Commerce (M.Com)',
      name:'Master of Commerce (M.Com)'
    },
    {
      id:'Doctor of Medicine (M.D)',
      name:'Doctor of Medicine (M.D)'
    },

    {
      id:'Master of Dental Surgery (M.D.S)',
      name:'Master of Dental Surgery (M.D.S)'
    },
    {
      id:'Masters in Design (M.Des)',
      name:'Masters in Design (M.Des)'
    },
    {
      id:'Master of Hospitality And Hotel Management (M.H.H.M)',
      name:'Master of Hospitality And Hotel Management (M.H.H.M)'
    },

    {
      id:'Master of Laws (M.L)',
      name:'Master of Laws (M.L)'
    },
    {
      id:'Master of Psychiatric Epidemiology (M.P.E)',
      name:'Master of Psychiatric Epidemiology (M.P.E)'
    },
    {
      id:'Master of Technology (M.Tech)',
      name:'Master of Technology (M.Tech)'
    },
    {
      id:'Master of Business Administration (MBA)',
      name:'Master of Business Administration (MBA)'
    },{
      id:'Master of Science (M.S)',
      name:'Master of Science (M.S)'
    },
    {
      id:'Master of Social Work (M.S.W)',
      name:'Master of Social Work (M.S.W)'
    },
    {
      id:'Master of Marketing Management (M.M.M)',
      name:'Master of Marketing Management (M.M.M)'
    },
    {
      id:'Master of Human Resource Management (M.H.R.M)',
      name:'Master of Human Resource Management (M.H.R.M)'
    },
    {
      id:'Others',
      name:'Others'
    },
  ];
  
}

