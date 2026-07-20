import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1Bw4S7ZDhVnvlORoASmQxNXblVJg0ELQ",
  authDomain: "ljm-8d094.firebaseapp.com",
  projectId: "ljm-8d094",
  storageBucket: "ljm-8d094.firebasestorage.app",
  messagingSenderId: "966417164354",
  appId: "1:966417164354:web:eabd41d2e8356f645125db"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);
const provider = new GoogleAuthProvider();

/* ── 요소 ── */
const loginModal  = document.querySelector("#loginModal");
const signupModal = document.querySelector("#signupModal");
const findModal   = document.querySelector("#findModal");

const loginForm  = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");
const findIdForm = document.querySelector("#findIdForm");
const findPwForm = document.querySelector("#findPwForm");

const signupOpenBtn = document.querySelector("#signupOpenBtn");
const signupCloseBtn = document.querySelector(".signup-modal__close");
const findOpenBtn   = document.querySelector("#findOpenBtn");
const findCloseBtn  = document.querySelector(".find-modal__close");
const googleLoginBtn = document.querySelector("#googleLoginBtn");

/* ── 유틸 ── */
function closeLoginModal() {
  if (loginModal) loginModal.classList.remove("is-open");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "auth-toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("is-visible"));
  });

  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function maskEmail(email) {
  const [local, domain] = email.split("@");
  const visible = local.slice(0, 2);
  const stars   = "*".repeat(Math.max(local.length - 2, 2));
  return `${visible}${stars}@${domain}`;
}

function showResult(el, message, isSuccess) {
  el.textContent = message;
  el.className = "find-modal__result " + (isSuccess ? "is-success" : "is-error");
}

/* ── 회원가입 모달 ── */
if (signupOpenBtn && signupModal) {
  signupOpenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeLoginModal();
    signupModal.classList.add("active");
  });
}
if (signupCloseBtn && signupModal) {
  signupCloseBtn.addEventListener("click", () => {
    signupModal.classList.remove("active");
  });
}

/* ── 아이디·비밀번호 찾기 모달 ── */
if (findOpenBtn && findModal) {
  findOpenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeLoginModal();
    // 첫 번째 탭(아이디 찾기) 초기화
    document.querySelectorAll(".find-modal__tab").forEach((t, i) => {
      t.classList.toggle("is-active", i === 0);
    });
    document.querySelectorAll(".find-modal__panel").forEach((p, i) => {
      p.classList.toggle("is-active", i === 0);
    });
    document.querySelectorAll(".find-modal__result").forEach((r) => {
      r.className = "find-modal__result";
      r.textContent = "";
    });
    findModal.classList.add("is-open");
  });
}

if (findCloseBtn && findModal) {
  findCloseBtn.addEventListener("click", () => findModal.classList.remove("is-open"));
}

if (findModal) {
  findModal.addEventListener("click", (e) => {
    if (e.target === findModal) findModal.classList.remove("is-open");
  });

  // 탭 전환
  findModal.querySelectorAll(".find-modal__tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      findModal.querySelectorAll(".find-modal__tab").forEach((t) =>
        t.classList.toggle("is-active", t === tab)
      );
      document.querySelector("#findIdPanel").classList.toggle("is-active", target === "id");
      document.querySelector("#findPwPanel").classList.toggle("is-active", target === "pw");
      // 결과 메시지 초기화
      document.querySelectorAll(".find-modal__result").forEach((r) => {
        r.className = "find-modal__result";
        r.textContent = "";
      });
    });
  });
}

/* ── 아이디 찾기 ── */
if (findIdForm) {
  findIdForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name  = document.querySelector("#findName").value.trim();
    const phone = document.querySelector("#findPhone").value.trim();
    const resultEl = document.querySelector("#findIdResult");

    try {
      const q = query(
        collection(db, "users"),
        where("name", "==", name),
        where("phone", "==", phone)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        showResult(resultEl, "일치하는 회원 정보를 찾을 수 없습니다.", false);
      } else {
        const email = snapshot.docs[0].data().email;
        showResult(resultEl, `가입된 아이디: ${maskEmail(email)}`, true);
      }
    } catch (err) {
      console.error("아이디 찾기 오류:", err);
      showResult(resultEl, "조회 중 오류가 발생했습니다. 다시 시도해주세요.", false);
    }
  });
}

/* ── 비밀번호 찾기 ── */
if (findPwForm) {
  findPwForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email    = document.querySelector("#findEmail").value.trim();
    const resultEl = document.querySelector("#findPwResult");

    try {
      await sendPasswordResetEmail(auth, email);
      showResult(resultEl, `${email} 으로 재설정 링크를 보냈습니다. 메일함을 확인해주세요.`, true);
    } catch (err) {
      console.error("비밀번호 찾기 오류:", err.code);
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-email") {
        showResult(resultEl, "등록되지 않은 이메일입니다.", false);
      } else {
        showResult(resultEl, "전송 중 오류가 발생했습니다. 다시 시도해주세요.", false);
      }
    }
  });
}

/* ── 구글 로그인 ── */
if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      closeLoginModal();
      alert(`${result.user.displayName || "사용자"}님 환영합니다!`);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") return;
      console.error("구글 로그인 오류:", error.code, error.message);
      const messages = {
        "auth/unauthorized-domain":
          "이 도메인은 Firebase에 등록되지 않았습니다.\nFirebase 콘솔 → Authentication → Settings → 승인된 도메인에 현재 주소를 추가해주세요.",
        "auth/operation-not-allowed":
          "Google 로그인이 비활성화되어 있습니다.\nFirebase 콘솔 → Authentication → Sign-in method → Google을 사용 설정해주세요.",
        "auth/popup-blocked":
          "팝업이 차단되었습니다. 브라우저의 팝업 차단을 해제하고 다시 시도해주세요.",
        "auth/network-request-failed":
          "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
      };
      alert(messages[error.code] || `로그인 실패 (${error.code})\n콘솔(F12)에서 자세한 내용을 확인해주세요.`);
    }
  });
}

/* ── 일반 로그인 ── */
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email    = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      closeLoginModal();
    } catch (error) {
      console.error("로그인 오류:", error.code);
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
        alert("등록되지 않은 계정입니다. 회원가입을 진행해주세요.");
        if (signupModal) signupModal.classList.add("active");
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  });
}

/* ── 회원가입 ── */
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name     = document.querySelector("#signupName").value.trim();
    const phone    = document.querySelector("#signupPhone").value.trim();
    const email    = document.querySelector("#signupEmail").value.trim();
    const password = document.querySelector("#signupPassword").value;

    if (!name)     { alert("이름을 입력해주세요.");     return; }
    if (!phone)    { alert("전화번호를 입력해주세요."); return; }
    if (!email)    { alert("이메일을 입력해주세요.");   return; }
    if (!password) { alert("비밀번호를 입력해주세요."); return; }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        email,
        createdAt: new Date().toISOString()
      });
      if (signupModal) signupModal.classList.remove("active");
      closeLoginModal();
      showToast(`회원가입되었습니다. 안녕하세요~${name}님!`);
    } catch (error) {
      console.error("회원가입 오류:", error.code);
      if (error.code === "auth/email-already-in-use") {
        alert("이미 가입된 이메일입니다.");
      } else if (error.code === "auth/weak-password") {
        alert("비밀번호는 6자 이상 입력해주세요.");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }
  });
}

/* ── 로그인 상태 감지 ── */
const logoutHandlers = new Map();

onAuthStateChanged(auth, (user) => {
  const loginLinks = document.querySelectorAll(".login-open");
  const loginTexts = document.querySelectorAll(".login-open span");

  if (user) {
    loginTexts.forEach((text) => { text.textContent = "로그아웃"; });

    loginLinks.forEach((link) => {
      if (logoutHandlers.has(link)) {
        link.removeEventListener("click", logoutHandlers.get(link), true);
      }
      const handler = async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const ok = confirm("로그아웃 하시겠습니까?");
        if (ok) {
          await signOut(auth);
          alert("로그아웃되었습니다.");
        }
      };
      logoutHandlers.set(link, handler);
      link.addEventListener("click", handler, true);
    });

  } else {
    loginTexts.forEach((text) => { text.textContent = "로그인"; });
    loginLinks.forEach((link) => {
      if (logoutHandlers.has(link)) {
        link.removeEventListener("click", logoutHandlers.get(link), true);
        logoutHandlers.delete(link);
      }
    });
  }
});
