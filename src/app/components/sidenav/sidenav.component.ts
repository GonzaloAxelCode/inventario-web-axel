import { clearTokensAction } from '@/app/state/actions/auth.actions';
import { AppState } from '@/app/state/app.state';
import { selectAuth } from '@/app/state/selectors/auth.selectors';
import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLinkActive, RouterLinkWithHref, RouterModule } from '@angular/router';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';
import { select, Store } from '@ngrx/store';
import { tuiAsPortal } from '@taiga-ui/cdk';
import {
  TUI_DARK_MODE, TUI_DARK_MODE_KEY,
  TuiDataList,
  TuiDropdown,
  TuiDropdownService,
  TuiIcon,
  TuiRoot,
  TuiTextfield
} from '@taiga-ui/core';
import {
  TuiTabs
} from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule, RouterModule,
    FormsModule,
    NgIf,
    TuiRoot,
    TuiDataList,
    TuiDropdown,
    TuiNavigation,
    TuiTabs,
    TuiTextfield, RouterLinkActive, RouterLinkWithHref, TuiIcon],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDropdownService, tuiAsPortal(TuiDropdownService)],

})
export class SidenavComponent {
  isAuthenticated$: Observable<any>;
  constructor(private store: Store<AppState>, public router: Router) {

    this.isAuthenticated$ = this.store.select(selectAuth).pipe(
      map(authState => authState.isAuthenticated)
    );

    this.loadingAuthenticated$ = this.store.select(selectAuth).pipe(
      map(authState => authState.loadingCheckAuthenticated)
    );
  }

  loadingAuthenticated$: Observable<any>;
  authState$ = this.store.pipe(select(selectAuth));

  logout() {
    this.store.dispatch(clearTokensAction())
    this.router.navigate(['/login']);
  }
  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  private readonly key = inject(TUI_DARK_MODE_KEY);
  private readonly storage = inject(WA_LOCAL_STORAGE);
  private readonly media = inject(WA_WINDOW).matchMedia('(prefers-color-scheme: dark)');

  protected readonly darkMode = inject(TUI_DARK_MODE);

  protected reset(): void {
    this.darkMode.set(this.media.matches);
    this.storage.removeItem(this.key);
  }
}
