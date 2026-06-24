const academyLat = 36.328682;
const academyLng = 127.423904;

const academyPosition = new naver.maps.LatLng(academyLat, academyLng);

const map = new naver.maps.Map("map", {
  center: academyPosition,
  zoom: 17,
});

const marker = new naver.maps.Marker({
  position: academyPosition,
  map: map,
});

const infoWindow = new naver.maps.InfoWindow({
  content: `
    <div style="padding:12px 16px;font-size:14px;font-weight:700;line-height:1.5;">
      이정민 애견미용학원<br>
      대전광역시 중구 선화서로 3, 3층
    </div>
  `,
});

infoWindow.open(map, marker);

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      const userPosition = new naver.maps.LatLng(userLat, userLng);

      new naver.maps.Marker({
        position: userPosition,
        map: map,
        title: "내 위치",
      });

      const R = 6371e3;
      const phi1 = userLat * Math.PI / 180;
      const phi2 = academyLat * Math.PI / 180;
      const deltaPhi = (academyLat - userLat) * Math.PI / 180;
      const deltaLambda = (academyLng - userLng) * Math.PI / 180;

      const a =
        Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = Math.round(R * c);

      document.getElementById("distanceText").textContent =
  `현재 접속 위치 기준 약 ${distance.toLocaleString()}m`;
    },
    function (error) {
      console.log("위치 오류 코드:", error.code);
      console.log("위치 오류 메시지:", error.message);
    }
  );
}

new naver.maps.Marker({
  position: userPosition,
  map: map,
  title: "내 위치",
});

const bounds = new naver.maps.LatLngBounds();
bounds.extend(academyPosition);
bounds.extend(userPosition);
map.fitBounds(bounds);
/* 그 아래에 거리 계산 */
const R = 6371e3;