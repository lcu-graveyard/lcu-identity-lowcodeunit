import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { BaseModeledResponse, Status } from '@lcu-ide/common';
import { SignInModel } from './sign-in.model';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'lcu-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  //  Fields
 /**
   * Local property for error
   */
  protected _error: string;

  /**
   * Local property for loading
   */
  protected _loading: boolean;

  /**
   * Local property for remember me
   */
  protected _rememberme: boolean;

  /**
   * Local property for username
   */
  protected _username: string;

  //  Properties

  /**
   * Access UsernameInput field
   */
    public get UsernameControl(): AbstractControl {
      return this.Form.get('usernameControl');
  }

  /**
   * Access password field
   */
  public get PasswordControl(): AbstractControl {
    return this.Form.get('passwordControl');
  }

  /**
   * Access remember me field
   */
  public get RememberMeControl(): AbstractControl {
    return this.Form.get('rememberMeControl');
  }

  /**
   * Toggle to show / hide password value
   */
  public HidePassword: boolean;

 /**
   * Sign in form group
   */
  public Form: FormGroup;

  /**
   * Registration error
   */
  public LoginError: string;

  /**
   * Output event for signing in
   */
  // tslint:disable-next-line:no-output-rename
  @Output('sign-in')
  SignIn: EventEmitter<SignInModel>;

  /**
   * Output event for forgot password
   */
  // tslint:disable-next-line:no-output-rename
  @Output('forgot-password')
  ForgotPassword: EventEmitter<string>;

  @Input('error')
  get Error(): string {
    return this._error;
  }

  set Error(val: string) {
    if (!val) { return; }
    this._error = val;

    this.hasError(val);
  }

  /**
   * Input property for remember me
   */
  @Input('rememberMe')
  get RememberMe(): boolean {
    return this._rememberme;
  }

  set RememberMe(val: boolean) {
    if (!val) { return; }
    this._rememberme = val;

    this.RememberMeControl.setValue(val);
  }

  /**
   * Input property for username
   */
  @Input('username')
  get Username(): string {
    return this._username;
  }

  set Username(val: string) {
    if (!val) { return; }
    this._username = val;
  }

  /**
   * Input property to loading
   */
  @Input('loading')
  get Loading(): boolean {
    return this._loading;
  }

  set Loading(val: boolean) {
    if (!val) { return; }

    this._loading = coerceBooleanProperty(val);

    this.disableForm(this._loading);
  }

  //  Constructors
  constructor() {
    this.HidePassword = true;

   this.SignIn = new EventEmitter<SignInModel>();

   this.ForgotPassword = new EventEmitter<string>();
  }

  // 	Life Cycle

 /**
 * On init setup form and fields
 */
  public ngOnInit() {
    this.Form = new FormGroup({
      usernameControl: new FormControl('', {validators: Validators.required}),
      passwordControl: new FormControl('', {validators: Validators.required}),
      rememberMeControl: new FormControl(false)
    });

    this.setInitialValues();
    this.onChanges();
  }

  // 	API Methods

  /**
   * Sign in handler
   */
  public SignInHandler() {
    const signIn: SignInModel = this.buildSignInModelFromForm();
    this.SignIn.emit(signIn);
  }

  /**
   * Forgot password handler
   */
  public ForgotPasswordHandler() {
    this.ForgotPassword.emit(this.UsernameControl.value);
  }

  // 	Helpers

  /**
   * Listen for form changes
   */
  protected onChanges(): void {

    this.Form.valueChanges.subscribe(val => {
    });

    this.UsernameControl.valueChanges.subscribe(val => {

    });
  }

  /**
   * Build sign in model
   */
  protected buildSignInModelFromForm(): SignInModel {
    return {

      Username: this.UsernameControl.value,
      Password: this.PasswordControl.value,
      RememberMe: !!this.RememberMeControl.value
    };
   }

   /**
    * Disable / enable form
    * @param val toggle value
    */
   protected disableForm(val: boolean): void {
    (val) ? this.Form.disable() : this.Form.enable();
   }

   /**
    * Set initial values if input properties have values
    */
   protected setInitialValues(): void {
    if (this._username) {
      this.UsernameControl.setValue(this._username);
    }

    if (this._rememberme) {
      this.RememberMeControl.setValue(this._rememberme);
    }
   }

   /**
    * Handle registration errors
    * 
    * @param val error message
    */
   protected hasError(val: string): void {
    this.LoginError = val;
   }
  }
