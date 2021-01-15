import { MqttServiceService } from '../services/mqtt-service.service';
import { Chart } from 'chart.js';
import { Component, ViewChild, ElementRef } from "@angular/core";
import { timer } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  private barChart: Chart;
  private bedroomMotionTimes;
  private kitchenMotionTimes;
  private diningMotionTimes;
  private livingMotionTimes;
  private toiletMotionTimes;
  private lastSeenLocation;
  private lastTimeInMinutes; 
  private lastTimeInSeconds;

  constructor(private mqttService: MqttServiceService){}

  
  ngAfterViewInit() {
    timer(0,10000)
    .subscribe(() => {
      console.log("Every 10s");
       this.bedroomMotionTimes = this.mqttService.getbedroomMotionTimes();
       console.log("bedroom" + this.bedroomMotionTimes);
       this.kitchenMotionTimes = this.mqttService.getkitchenMotionTimes();
       console.log("kitchen" + this.kitchenMotionTimes);
       this.diningMotionTimes = this.mqttService.getdiningMotionTimes();
       console.log("dining" + this.diningMotionTimes);
       this.livingMotionTimes = this.mqttService.getlivingMotionTimes();
       console.log("living" + this.livingMotionTimes);
       this.toiletMotionTimes = this.mqttService.gettoiletMotionTimes();
       console.log("toilet" + this.toiletMotionTimes);
       this.lastSeenLocation = this.mqttService.getLastSeenlocation();
       console.log("lastSeenLocation" + this.lastSeenLocation);
       this.lastTimeInMinutes = this.mqttService.getLastTimeInMinutes();
       console.log("lastTimeInMinutes" + this.lastTimeInMinutes);
       this.lastTimeInSeconds = this.mqttService.getLastTimeInSeconds();
       //console.log(this.lastSeenLocation);
       this.render();
    });
  }

  render() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["bedroom", "kitchen", "dining", "living", "toilet"],
        datasets: [
          {
            label: "number of motion in every room", 
            data: [this.bedroomMotionTimes, this.kitchenMotionTimes, this.diningMotionTimes, this.livingMotionTimes,
                   this.toiletMotionTimes],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}

