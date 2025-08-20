 import { Component } from '@angular/core';
import { RouterLinkActive, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // activeSubMenu: boolean =false
  activeSubMenu: string | null = null;
  isOpenNotification = false;
  isOpenLogout = false;


    // Listen for route changes to update the active submen
  toggleSubMenu(menuId: string): void {
    this.activeSubMenu = this.activeSubMenu === menuId ? null : menuId;
    console.log(this.activeSubMenu);
    sessionStorage.setItem('activeSubmenu', this.activeSubMenu || '');
  }

  ngOnInit() {
    // this.activeSubMenu = sessionStorage.getItem('activeSubMenu') === 'true';
    this.activeSubMenu = sessionStorage.getItem('activeSubmenu');

    console.log(this.activeSubMenu);
  }

  constructor(private router: Router) {
  }


  onOpenNotification(type: string): void {
    this.isOpenNotification = this.isOpenNotification;
  }

  onOpenLogout(type: string): void {
    this.isOpenLogout = this.isOpenLogout

    if(type === 'logout') {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('email');
      this.router.navigate(['/admin/login']);
    }
  }
}
