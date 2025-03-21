import { User } from '@/app/models/user.models';
import { DialogCreateUserService } from '@/app/services/ui/dialog-create-user.service';
import { DialogEditUserPermissionService } from '@/app/services/ui/dialog-edit-user-permissions.service';
import { DialogUpdatePasswordService } from '@/app/services/ui/dialog-update-password-user.service';
import { AppState } from '@/app/state/app.state';
import { UserState } from '@/app/state/reducers/user.reducer';
import { selectUsersState } from '@/app/state/selectors/user.selectors';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance, TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiSwitch } from '@taiga-ui/kit';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usermanagement',
  standalone: true,
  imports: [TuiTable, CommonModule, TuiTable, TuiSwitch, FormsModule, TuiAppearance, TuiButton, TuiIcon],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.scss'
})
export class UsermanagementComponent {
  userState$?: Observable<UserState>;
  users: User[] = []

  constructor(private store: Store<AppState>) {
    this.userState$ = this.store.select(selectUsersState);
    this.userState$?.subscribe(userState => {
      this.users = userState.users;
      console.log(userState.users)
    })
  }

  private readonly dialogServiceEditPermissions = inject(DialogEditUserPermissionService);
  private readonly dialogServiceUpdatepassowrd = inject(DialogUpdatePasswordService);
  private readonly dialogServiceCreateuser = inject(DialogCreateUserService);


  protected showDialogUpdatePassword(user: User): void {
    this.dialogServiceUpdatepassowrd.open(user).subscribe({

    });
  }

  protected showDialogEditPermissions(user: User): void {
    this.dialogServiceEditPermissions.open(user).subscribe({

    });
  }
  protected showDialogCreateUser(): void {
    this.dialogServiceCreateuser.open().subscribe({

    });
  }

}
