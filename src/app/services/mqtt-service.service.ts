import { Injectable } from '@angular/core';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification/ngx';

@Injectable({
  providedIn: 'root'
})
export class MqttServiceService {

  private mqttStatus: string = 'Disconnected';
  private mqttClient: any = null;
  private message: any = '';
  private messageToSend: string = 'Type your message here.';
  private topic: string = 'swen325/a3';
  private clientId: string = '342323cwwerweAWQWXX';  // this string must be unique to every client
  private lastSeenlocation: String = ' ';
  private lastTime: number = 0;
  private lastTimeInMinutes: number = 0 ;
  private bedroomMotionTimes: number = 0;
  private kitchenMotionTimes: number = 0;
  private diningMotionTimes: number = 0;
  private livingMotionTimes: number = 0;
  private toiletMotionTimes: number = 0;
  private toiletBattery: number = 0;
  private diningBattery: number = 0;
  private bedroomBattery: number = 0;
  private kitchenBattery: number = 0;
  private livingBattery: number = 0;
  private lastTimeInSeconds: number = 0;


  constructor(private localNotification: PhonegapLocalNotification) { }
  
  public getbedroomMotionTimes = () => this.bedroomMotionTimes;
  public getkitchenMotionTimes = () => this.kitchenMotionTimes;
  public getdiningMotionTimes = () => this.diningMotionTimes;
  public getlivingMotionTimes = () => this.livingMotionTimes;
  public gettoiletMotionTimes = () => this.toiletMotionTimes;
  public gettoiletBattery = () => this.toiletBattery;
  public getdiningBattery = () => this.diningBattery;
  public getbedroomBattery = () => this.bedroomBattery; 
  public getkitchenBattery = () => this.kitchenBattery;
  public getlivingBattery = () => this.livingBattery;
  public getLastSeenlocation = () => this.lastSeenlocation;
  public getLastTimeInMinutes = () => this.lastTimeInMinutes;
  public getLastTimeInSeconds = () => this.lastTimeInSeconds;

  public connect() {

  	this.mqttStatus = 'Connecting...';

    /**
     * This will generate an error because we have not imported Paho as name
     * using import but this is okay since we have included paho-mqtt.js
     * in the index.html. 
     * The solution to this issue to write an Ionic/angular wrapper to Paho MQTT.
     * Note that current available wrappers have issues with Ionic.
     */ 
  	this.mqttClient = new  Paho.MQTT.Client('localhost', 8883, '/mqtt', this.clientId);
 
	  // set callback handlers
	  this.mqttClient.onConnectionLost = this.onConnectionLost;
	  this.mqttClient.onMessageArrived = this.onMessageArrived;

	  // connect the client
	  console.log('Connecting to mqtt via websocket');
	  this.mqttClient.connect({timeout:10, useSSL:false, onSuccess:this.onConnect, onFailure:this.onFailure});
  }

  public disconnect() {
  	if(this.mqttStatus == 'Connected') {
  		this.mqttStatus = 'Disconnecting...';
  		this.mqttClient.disconnect();
  		this.mqttStatus = 'Disconnected';
  	}
  }

  public sendMessage() {
  	if(this.mqttStatus == 'Connected') {
  		this.mqttClient.publish(this.topic, this.messageToSend);
  	}
  }

  public onConnect = () => {
  	console.log('Connected');
  	this.mqttStatus = 'Connected';

  	// subscribe
  	this.mqttClient.subscribe(this.topic);
  }

  public onFailure = (responseObject) => {
  	console.log('Failed to connect');
  	this.mqttStatus = 'Failed to connect';
  }


  public onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      this.mqttStatus = 'Disconnected';
    } 	
  }

  public onMessageArrived = (message) => {

    this.message = message.payloadString;
    const split: string[] = this.message.split(",");

    if(this.lastTimeInMinutes == 0){
      this.lastTimeInMinutes = new Date(split[0]).getTime();
    }
    if(split[1] == "living") {
      this.livingBattery = parseInt(split[3]);
    }else if(split[1] == "dining"){
      this.diningBattery = parseInt(split[3]);
    }else if(split[1] == "kitchen"){
      this.kitchenBattery = parseInt(split[3]);
    }else if(split[1] == "toilet"){
      this.toiletBattery = parseInt(split[3]);
    }else if (split[1] == "bedroom"){
      this.bedroomBattery = parseInt(split[3]);
    }

    if(split[2] == "1"){// if motion is detected.

    this.lastSeenlocation = split[1];

      if(split[1] == "living"){
        this.livingMotionTimes = this.livingMotionTimes + 1;
      }else if(split[1] == "dining"){
        this.diningMotionTimes = this.diningMotionTimes + 1;
      }else if(split[1] == "kitchen"){
        this.kitchenMotionTimes = this.kitchenMotionTimes + 1;
      }else if(split[1] == "toilet"){
        this.toiletMotionTimes = this.toiletMotionTimes + 1;
      }else if(split[1] == "bedroom"){
        this.bedroomMotionTimes = this.bedroomMotionTimes + 1;
      }
      this.lastTimeInMinutes = new Date(split[0]).getTime();
      this.lastTimeInSeconds = 0;
    } 
    else{//no motion detected.
      this.lastTimeInSeconds = ((new Date(split[0]).getTime()) - (this.lastTimeInMinutes))/1000;

      if(this.lastTimeInSeconds >= 10 && this.lastTimeInSeconds <= 100){
        this.pushNotification();
      }
    }
  }

  public pushNotification(){
    this.localNotification.requestPermission().then(
      (permission) => {
        if (permission === 'granted' ) {
          // Create the notification
          this.localNotification.create('Citizen Unseen', {
            tag: 'Citizen Unseen',
            body: 'The senior being monitored unseen for 5 minutes',
          });
        }
      }
    );
  }

}
