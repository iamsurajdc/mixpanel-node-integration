import { Injectable } from '@nestjs/common';
var Mixpanel = require('mixpanel');
import { v4 as uuidv4 } from 'uuid';
import {
  MIXPANEL_API_SECRET,
  MIXPANEL_PROJECT_TOKEN,
} from '../mixpanelApiKeys';

@Injectable()
export class AppService {
  /** initialize mixpanel client configured to communicate over http instead of https */
  private readonly mixpanel = Mixpanel.init(MIXPANEL_PROJECT_TOKEN, {
    protocol: 'http',
    keepAlive: false,
  });

  getHello(): string {
    return 'Hello World!';
  }

  async trackEvent() {
    try {
      console.log(`🚀 ~ trackEvent`);

      // track an event with optional properties
      this.mixpanel.track('test_kyc_started_by_billy', {
        distinct_id: 'billybob001',
        userId: uuidv4(),
        companyName: 'testCompany',
        Gender: 'Male',
      });
    } catch (error) {
      console.log('error : trackEvent', error);
      throw error;
    }
  }

  async createUser() {
    try {
      console.log(`🚀 ~ createUser`);

      // create or update a user in Mixpanel Engage
      this.mixpanel.people.set(
        'billybob001',
        {
          $first_name: 'Billy',
          $last_name: 'Bob',
          $created: new Date('jan 1 2013').toISOString(),
          plan: 'premium',
          games_played: 1,
          points: 0,
        },
        {
          $ignore_time: true, // - pass option $ignore_time: true to prevent the $last_seen property from being updated
          $ip: '127.0.0.1', // set a user profile's IP address to get automatic geolocation info
        },
      );
    } catch (error) {
      console.log('error : createUser', error);
      throw error;
    }
  }
}
