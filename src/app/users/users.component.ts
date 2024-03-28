import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userForm: any;
  users: any;

  constructor(public fb: FormBuilder) {
    this.userForm = this.fb.group({
      Name: [''],
      Email: [''],
      Mobile: [''],
      Age: [''],
      id: [],
    });
  }

  ngOnInit(): void {
    this.GetAllUsers();
  }

  SubmitForm() {
    if (this.userForm.value.Name) {
      var type = this.userForm.value.id == null ? 'Add' : 'Update';
      // You can add your form submission logic here
      if (type === 'Add') {
        Swal.fire({
          icon: 'success',
          title: 'User (' + this.userForm.value.Name + ') Saved Successfully',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'User (' + this.userForm.value.Name + ') Updated Successfully',
        });
      }
      this.userForm.reset();
      this.GetAllUsers();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please Fill User Information',
      });
    }
  }

  GetAllUsers() {
    // Simulated data fetching
    this.users = [
      {
        id: 1,
        Name: 'User 1',
        Email: 'user1@example.com',
        Mobile: '1234567890',
        Age: 25,
      },
      {
        id: 2,
        Name: 'User 2',
        Email: 'user2@example.com',
        Mobile: '9876543210',
        Age: 30,
      },
      {
        id: 3,
        Name: 'User 3',
        Email: 'user3@example.com',
        Mobile: '9998887770',
        Age: 35,
      },
    ];
  }

  DeleteConfirmation(ID: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to Delete this user?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.DeleteUserByID(ID);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  DeleteUserByID(ID: any) {
    // Simulated deletion
    this.users = this.users.filter((user: any) => user.id !== ID);
    Swal.fire('Deleted!', '', 'success');
  }

  GetUserByID(ID: any) {
    // You can add your logic to fetch user by ID here
  }
}
