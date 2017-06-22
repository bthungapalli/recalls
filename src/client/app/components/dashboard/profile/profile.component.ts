import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {Profile} from './profile.model';
import {ProfileService} from './profile.service';


@Component({
  selector: 'profile',
  templateUrl:"./app/components/dashboard/profile/profile.html"
})
export class ProfileComponent {

      public errorMessage:String="";
      public profileModel: Profile;

      constructor(private profileService:ProfileService) {
          this.profileModel = new Profile();
      }

      submitProfile(){
        this.errorMessage="";
            this.profileService.submitProfile(this.profileModel).subscribe(response => {
                console.log(response);
            },err => {
                                    console.log(err);
            });


      }

 }
