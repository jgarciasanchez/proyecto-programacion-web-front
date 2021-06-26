import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/conections/services/response';
import { addFriend, deleteFriend, getUserById, getUserProfile, isFriend } from 'src/app/conections/user/resolver';
import { GetUserByIdOutput, GetUserProfileOutput, User, UsersProfileData } from 'src/app/conections/user/response';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.scss']
})
export class ServiceInfoComponent implements OnInit {

  userId: string;
  profile: UsersProfileData;
  isFriend: boolean;
  isHimself: boolean = false;

  constructor(private route: ActivatedRoute,
    private connection: GraphqlConnectionService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.loadInfoProfile();
  }

  loadInfoProfile() {
    this.userId = this.route.snapshot.params['userId'];
    var query = getUserProfile(parseInt(this.userId));
    this.connection.postHttp(query, true).subscribe(req => {
      const { getUserProfile }: any = req.data;
      let { success, data }: GetUserProfileOutput = getUserProfile;
      this.profile = data[0];
      if (this.userId != this.authService.getCurrentId()) {
        console.log(this.authService.getCurrentId());

        this.isHimself = false;
        query = isFriend(parseInt(this.userId));
        this.connection.postHttp(query, true).subscribe(req => {
          this.isFriend = req.data.isFriend.data;
        }, err => {
          console.log('');

        });
      } else {
        this.isHimself = true;
      }

    }, errr => {
      console.log(errr);
    });
  }

  follow(id) {
    var query = addFriend(parseInt(this.userId));
    this.connection.postHttp(query, true).subscribe(req => {
      this.isFriend = true;
    }, err => {

    })
  }

  unFollow(id) {
    var query = deleteFriend(parseInt(this.userId));
    this.connection.postHttp(query, true).subscribe(req => {
      this.isFriend = false;
    }, err => {

    })
  }

}
