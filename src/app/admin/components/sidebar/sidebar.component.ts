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

  toggleSubMenu(menuId: string): void {
    this.activeSubMenu = this.activeSubMenu === menuId ? null : menuId;
    console.log(this.activeSubMenu);
    localStorage.setItem('activeSubmenu', this.activeSubMenu || '');
  }

  ngOnInit() {
    // this.activeSubMenu = localStorage.getItem('activeSubMenu') === 'true';
    this.activeSubMenu = localStorage.getItem('activeSubmenu');

    console.log(this.activeSubMenu);
  }

  constructor(private router: Router) {}

  onOpenNotification(type: string): void {
    this.isOpenNotification = this.isOpenNotification;
  }
}
