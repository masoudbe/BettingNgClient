import {Team} from "./Team";
import {Player} from "./Player";
import {Injectable} from '@angular/core';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class FoosballData {

  public getImageURL(){
    return "https://portal/recruitmentFile/GetProfileImage?imageId=";
  }

  public getTeams() {
    var teamMap = new Map();

    teamMap.set("A1", new Team("A1", "سام", false, []));
    teamMap.set("A2", new Team("A2", "اسلوموشن", false, []));
    teamMap.set("A3", new Team("A3", "بزن بهادر", false, []));
    teamMap.set("A4", new Team("A4", "بزن بهادر", false, []));
    teamMap.set("A5", new Team("A5", "رویین تنان قدیم", false, []));
    teamMap.set("B1", new Team("B1", "خرچنگهای سیاه", false, []));
    teamMap.set("B2", new Team("B2", "مادرز اف دراگون", false, []));
    teamMap.set("B3", new Team("B3", "شهید منصوری قرچک", false, []));
    teamMap.set("B4", new Team("B4", "آپاچی", false, []));
    teamMap.set("B5", new Team("B5", "ساجد مهلا", false, []));
    teamMap.set("C1", new Team("C1", "چیکو", false, []));
    teamMap.set("C2", new Team("C2", "وردربرمن", false, []));
    teamMap.set("C3", new Team("C3", "لون سیتی", false, []));
    teamMap.set("C4", new Team("C4", "سگ دست", false, []));
    teamMap.set("C5", new Team("C5", "کافی شاپ", false, []));
    teamMap.set("D1", new Team("D1", "هارت بیت", false, []));
    teamMap.set("D2", new Team("D2", "گورکن", false, []));
    teamMap.set("D3", new Team("D3", "عقیق", false, []));
    teamMap.set("D4", new Team("D4", "صفر دو پا", false, []));
    teamMap.set("D5", new Team("D5", "پوپک", false, []));

    let playerMap = this.getPlayers();

    for (let player of playerMap) {
      var key = player[0];
      key = key.substring(0, 2);
      var team = teamMap.get(key);
      team.players.push(player[1]);
    }

    return teamMap;
  }

  getPlayers() {

    var images = this.getImageIds();

    var playerMap = new Map();

    playerMap.set("A11", new Player("آرمین جهانگیری", "A11", false, images.get("A11")));
    playerMap.set("A12", new Player("محمد آدم بیک", "A12", false, images.get("A12")));
    playerMap.set("A13", new Player("محسن گندمکار", "A13", false, images.get("A13")));

    playerMap.set("A21", new Player("احسان شمس سیر", "A21", false, images.get("A21")));
    playerMap.set("A22", new Player("حمیدرضا روستایی", "A22", false, images.get("A22")));

    playerMap.set("A31", new Player("نیما علیدوستی", "A31", false, images.get("A31")));
    playerMap.set("A32", new Player("محمد کلهری", "A32", false, images.get("A32")));

    playerMap.set("A41", new Player("وحید ترابی", "A41", false, images.get("A41")));
    playerMap.set("A42", new Player("بهزاد اشیدری", "A42", false, images.get("A42")));
    playerMap.set("A43", new Player("مینا سالاری", "A43", false, images.get("A43")));

    playerMap.set("A51", new Player("وحید فتاحی", "A51", false, images.get("A51")));
    playerMap.set("A52", new Player("سامان قاسمی", "A52", false, images.get("A52")));

    playerMap.set("B11", new Player("مریم سقایی", "B11", false, images.get("B11")));
    playerMap.set("B12", new Player("محمد انصاری", "B12", false, images.get("B12")));

    playerMap.set("B21", new Player("فاطمه مولایی", "B21", false, images.get("B21")));
    playerMap.set("B22", new Player("الهه اشرفی", "B22", false, images.get("B22")));

    playerMap.set("B31", new Player("سعید محمد هاشم", "B31", false, images.get("B31")));
    playerMap.set("B32", new Player("زهرا منصوری", "B32", false, images.get("B32")));

    playerMap.set("B41", new Player("محمد عباسی", "B41", false, images.get("B41")));
    playerMap.set("B42", new Player("فرزاد حبیبی", "B42", false, images.get("B42")));

    playerMap.set("B51", new Player("مهرداد توانگری", "B51", false, images.get("B51")));
    playerMap.set("B52", new Player("مهناز شرافتی", "B52", false, images.get("B52")));
    playerMap.set("B53", new Player("محمد مهدی برزگر", "B53", false, images.get("B53")));

    playerMap.set("C11", new Player("رویا بدخشان", "C11", false, images.get("C11")));
    playerMap.set("C12", new Player("امیر تفضلی", "C12", false, images.get("C12")));
    playerMap.set("C13", new Player("محمد صفتی", "C13", false, images.get("C13")));

    playerMap.set("C21", new Player("مجید امین زاده", "C21", false, images.get("C21")));
    playerMap.set("C22", new Player("علیرضا دهقان", "C22", false, images.get("C22")));
    playerMap.set("C23", new Player("سلام صالح پور", "C23", false, images.get("C23")));

    playerMap.set("C31", new Player("امین عندلیبی", "C31", false, images.get("C31")));
    // playerMap.set("C32", new Player("ابوذر محیطی", "C32", false, images.get("C32")));

    playerMap.set("C41", new Player("میلاد احمدی", "C41", false, images.get("C41")));
    playerMap.set("C42", new Player("حمید عباسی", "C42", false, images.get("C42")));

    playerMap.set("C51", new Player("فرزین شیرازی", "C51", false, images.get("C51")));
    playerMap.set("C52", new Player("شهرام آقایی", "C52", false, images.get("C52")));

    playerMap.set("D11", new Player("شاهین رضایی", "D11", false, images.get("D11")));
    playerMap.set("D12", new Player("علیرضا ظریف", "D12", false, images.get("D12")));

    playerMap.set("D21", new Player("مهدی امانی آذر", "D21", false, images.get("D21")));
    playerMap.set("D22", new Player("محمد سجادی", "D22", false, images.get("D22")));

    playerMap.set("D32", new Player("سعید رمضانی", "D31", false, images.get("D32")));
    playerMap.set("D31", new Player("مسعود بهنود", "D32", false, images.get("D31")));

    playerMap.set("D41", new Player("محمود شاهرکنی", "D41", false, images.get("D41")));
    playerMap.set("D42", new Player("مجید بردابرد", "D42", false, images.get("D42")));
    playerMap.set("D43", new Player("محمد امین جاوید", "D43", false, images.get("D43")));

    playerMap.set("D51", new Player("پریسا خیامی", "D51", false, images.get("D51")));
    playerMap.set("D52", new Player("نغمه همایونی", "D52", false, images.get("D52")));
    playerMap.set("D53", new Player("مهرشاد باروتیان", "D53", false, images.get("D53")));

    return playerMap;
  }

  function

  getImageIds() {
    var imageMap = new Map();

    imageMap.set("A11", "e52625dc02d8e71180d20050569da093");
    imageMap.set("A12", "565039ad3dffe51180c40050569da093");
    imageMap.set("A13", "b682aa993dffe51180c40050569da093");

    imageMap.set("A21", "8fffea45337ce81180da0050569da093");
    imageMap.set("A22", "26101ebc7b06e91180e40050569da093");

    imageMap.set("A31", "bc7b3c363effe51180c40050569da093");
    imageMap.set("A32", "e629a59f3dffe51180c40050569da093");

    imageMap.set("A41", "105c9a583fffe51180c40050569da093");
    imageMap.set("A42", "175799c73dffe51180c40050569da093");
    imageMap.set("A43", "69d30161f9f5e81180e30050569da093");

    imageMap.set("A51", "8e5a2d8b3effe51180c40050569da093");
    imageMap.set("A52", "829c1e7e3effe51180c40050569da093");

    imageMap.set("B11", "d8cfca82715ce61180c90050569da093");
    imageMap.set("B12", "ffcb8baad1a8e71180d20050569da093");

    imageMap.set("B21", "25bb83be01d5e81180e20050569da093");
    imageMap.set("B22", "5c80b5f89297e81180db0050569da093");

    imageMap.set("B31", "cee551da2f50e81180d70050569da093");
    imageMap.set("B32", "4b0f645df9b0e71180d20050569da093");

    imageMap.set("B41", "625add9f9370e91180e50050569da093");
    imageMap.set("B42", "3a83aa993dffe51180c40050569da093");

    imageMap.set("B51", "9c8b53c98eb2e71180d20050569da093");
    imageMap.set("B52", "aaabdf2425ace71180d20050569da093");
    imageMap.set("B53", "47a07ad4f0c7e81180e20050569da093");

    imageMap.set("C11", "a63e656b8b7ae71180d10050569da093");
    imageMap.set("C12", "b282aa993dffe51180c40050569da093");
    imageMap.set("C13", "4a719c8b1eb0e81180dc0050569da093");

    imageMap.set("C21", "62a6e252023be81180d50050569da093");
    imageMap.set("C22", "9764cef1136fe81180da0050569da093");
    imageMap.set("C23", "19c02605136fe81180da0050569da093");

    imageMap.set("C31", "ffbf15b5f8f5e81180e30050569da093");
    imageMap.set("C32", "");

    imageMap.set("C41", "d8a4c2b320ace71180d20050569da093");
    imageMap.set("C42", "");

    imageMap.set("C51", "d8a4c2b320ace71180d20050569da093");
    imageMap.set("C52", "cb875a0aa27ae71180d10050569da093");

    imageMap.set("D11", "4542c8fbd3b7e71180d20050569da093");
    imageMap.set("D12", "869c1e7e3effe51180c40050569da093");

    imageMap.set("D21", "83b3cbef259de81180db0050569da093");
    imageMap.set("D22", "83b3cbef259de81180db0050569da093");

    imageMap.set("D31", "143121b71d13e91180e40050569da093");
    imageMap.set("D32", "6ae975c53effe51180c40050569da093");

    imageMap.set("D41", "a07e5fb4a029e81180d50050569da093");
    imageMap.set("D42", "e0105c203fffe51180c40050569da093");
    imageMap.set("D43", "be28cb6a3effe51180c40050569da093");

    imageMap.set("D51", "fe82aa993dffe51180c40050569da093");
    imageMap.set("D52", "64b1e7fe4b69e71180d10050569da093");
    imageMap.set("D53", "d5c4e7164e7be71180d10050569da093");

    return imageMap;
  }
}
