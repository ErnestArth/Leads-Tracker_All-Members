import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../../../services/user.service'
@Component({
  selector: 'app-create-team-member',
  standalone: false,
  templateUrl: './create-team-member.component.html',
  styleUrl: './create-team-member.component.css'
})
export class CreateTeamMemberComponent {

  isModalOpen = false;
  showSuccess = false;
  modalForm!: FormGroup;

  constructor(private fb: FormBuilder, private UserService:UserService) {}

  
  ngOnInit(): void {
    this.modalForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      otherNames: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      // staffId: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if(this.modalForm.valid){
      this.showSuccess = true;

      this.UserService.addTeamMember(this.modalForm.value).subscribe({
        next: ()=>{
          console.log(this.modalForm.value)
        }
      })

    }
  
}

@Output() onCancel = new EventEmitter<void>();

cancel(){
  this.onCancel.emit();
}

onSaveChanges(): void {
  if (this.modalForm.valid) {
    this.modalForm.reset()
  }
  this.showSuccess=false
  
}
}
