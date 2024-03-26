import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  resumeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.resumeForm = this.formBuilder.group({
      personalDetails: this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        linkedIn: [''],
        github: [''],
        shortIntro: [''],
        address: [''],
        phoneNumber: ['', Validators.pattern('^[0-9]*$')], // Assuming phone number contains only digits
      }),
      skills: this.formBuilder.array([
        // Include initial skills with validators
      ]),
      educations: this.formBuilder.array([this.createEducationField()]),
      projects: this.formBuilder.array([this.createProjectField()]),
    });
  }

  get skills() {
    return this.resumeForm.get('skills') as FormArray;
  }

  get educations() {
    return this.resumeForm.get('educations') as FormArray;
  }

  get projects() {
    return this.resumeForm.get('projects') as FormArray;
  }

  createEducationField(): FormGroup {
    return this.formBuilder.group({
      collegeName: ['', Validators.required],
      universityName: ['', Validators.required],
      marksObtained: ['', Validators.required],
      shortInfo: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  createProjectField(): FormGroup {
    return this.formBuilder.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
      techStack: ['', Validators.required],
      githubLink: ['', Validators.required],
    });
  }

  addSkillField() {
    if(this.skills.length < 10){
      this.skills.push(this.formBuilder.control('', Validators.required));
    }
  }

  addEducationField() {
    if (this.educations.length < 2) {
      this.educations.push(this.createEducationField());
    }
  }

  addProjectField() {
    if (this.projects.length < 2) {
      this.projects.push(this.createProjectField());
    }
  }

  onSubmit() {
    if (this.resumeForm.invalid) {
      // Handle form validation errors
      return;
    }

    // Form submission logic
  }
}
