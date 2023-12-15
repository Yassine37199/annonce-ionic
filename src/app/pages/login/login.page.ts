import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formError: Boolean = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {}

  async login(form: any): Promise<void> {
    // Access form values
    console.log('Name:', form.value.password);
    console.log('Email:', form.value.email);
    this.formError = false;
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        form.value.email,
        form.value.password
      );
      console.log('User signed in:', result.user);
      this.router.navigate(['home']);
    } catch (error) {
      this.formError = true;
      console.error('Error signing in');
    }
  }

  toRegisterPage() {
    this.router.navigate(['register']);
  }
}
