import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'หน้าหลัก',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'icon-home',
      },
      {
        state: 'request',
        short_label: 'R',
        name: 'แจ้งรับบริการ',
        type: 'sub',
        icon: 'icon-view-grid',
      
        children: [
          {
            state: 'validation',
            name: 'ฟอร์มแจ้งข้อมูล'
          },
          {
            state: 'data',
            name: 'ประวัติแจ้งรับบริการ'
          },
          {
            state: 'chart',
            name: 'ลำดับคิวบริการ'
          }
        ]
      }
    ],
  },
  {
    label: 'รับซ่อม/ตรวจซ่อม',
    main: [
      {
        state: 'รับซ่อม',
        short_label: 'A',
        name: 'รับซ่อม',
        type: 'link',
        icon: 'icon-reload rotate-refresh'
      },
      {
        state: 'ส่งซ่อม/ส่งเคลม',
        short_label: 'A',
        name: 'ส่งซ่อม/ส่งเคลม',
        type: 'link',
        icon: 'icon-reload rotate-refresh'
      },
      {
        state: 'ปิดงานซ่อม',
        short_label: 'A',
        name: 'ปิดงานซ่อม',
        type: 'link',
        icon: 'icon-reload rotate-refresh'
      },
      {
        state: 'ยกเลิก',
        short_label: 'A',
        name: 'ยกเลิก',
        type: 'link',
        icon: 'icon-reload rotate-refresh'
      }
    ]
  },
  {
    label: 'ลงทะเบียนอุปกรณ์',
    main: [
      {
        state: 'ยกเลิก',
        short_label: 'A',
        name: 'ทะเบียนอุปกรณ์',
        type: 'link',
        icon: 'icon-reload rotate-refresh'
      }
    ]
  },
  {
    label: 'แจ้งปัญหาระบบ',
    main: [
      {
        state: 'system-problems',
        short_label: 'B',
        name: 'System problems',
        type: 'sub',
        icon: 'icon-receipt',
        children: [
          {
            state: 'problems',
            name: 'แจ้งระบบ system'
          }, {
            state: 'list-data',
            name: 'รายการที่แจ้ง'
          }
        ]
      },
     
    ]
  },
  {
    label: 'รายงาน',
    main: [
      {
        state: 'charts',
        short_label: 'C',
        name: 'Charts',
        type: 'sub',
        icon: 'icon-bar-chart-alt',
        children: [
          {
            state: 'google',
            name: 'Google'
          }, {
            state: 'chart-js',
            name: 'ChartJS'
          }, {
            state: 'radial',
            name: 'Radial'
          }, {
            state: 'c3-js',
            name: 'C3 JS'
          }
        ]
      },
      {
        state: 'map',
        short_label: 'M',
        name: 'Maps',
        type: 'sub',
        icon: 'icon-map-alt',
        children: [
          {
            state: 'google',
            name: 'Google'
          }
        ]
      },
     
    ]
  },
  {
    label: 'ตั้งค่าระบบ',
    main: [
      {
        state: 'auth',
        short_label: 'A',
        name: 'Authentication',
        type: 'sub',
        icon: 'icon-id-badge',
        children: [
          {
            state: 'login',
            type: 'sub',
            name: 'Login Pages',
            children: [
              {
                state: 'simple',
                name: 'Simple',
                target: true
              }, {
                state: 'header-footer',
                name: 'Header & Footer',
                target: true
              }, {
                state: 'social',
                name: 'Social Icon',
                target: true
              }, {
                state: 'social-header-footer',
                name: 'Social Header & Footer',
                target: true
              }
            ]
          }, {
            state: 'registration',
            type: 'sub',
            name: 'Registration Pages',
            children: [
              {
                state: 'simple',
                name: 'Simple',
                target: true
              }, {
                state: 'header-footer',
                name: 'Header & Footer',
                target: true
              }, {
                state: 'social',
                name: 'Social',
                target: true
              }, {
                state: 'social-header-footer',
                name: 'Social Header & Footer',
                target: true
              }
            ]
          },
          {
            state: 'forgot',
            name: 'Forgot Password',
            target: true
          },
          {
            state: 'lock-screen',
            name: 'Lock Screen',
            target: true
          },
        ]
      },
      {
        state: 'maintenance',
        short_label: 'A',
        name: 'Maintenance',
        type: 'sub',
        icon: 'icon-settings',
        children: [
          /*{
            state: 'error',
            name: 'Error'
          },
          {
            state: 'coming-soon',
            name: 'Coming Soon'
          },*/
          {
            state: 'offline-ui',
            name: 'Offline UI',
            target: true
          }
        ]
      },
      {
        state: 'user',
        short_label: 'U',
        name: 'User Profile',
        type: 'sub',
        icon: 'icon-user',
        children: [
          {
            state: 'profile',
            name: 'User Profile'
          }, {
            state: 'card',
            name: 'User Card'
          }
        ]
      }
    ]
  },
 
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
