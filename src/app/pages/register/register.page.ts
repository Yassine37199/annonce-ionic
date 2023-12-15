import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formError: boolean = false;
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  toLoginPage() {
    this.router.navigate(['login']);
  }

  async register(registerForm: any) {
    try {
      const { email, password, name, phone } = registerForm.value;
      console.log({ name, phone, email, password });
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      await this.firestore.collection('users').doc(user!.uid).set({
        name,
        phone,
        email,
      });

      this.router.navigate(['home']);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }
}
