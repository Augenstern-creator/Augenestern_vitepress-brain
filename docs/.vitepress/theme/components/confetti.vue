<!-- 首页欢呼特效 -->

<script setup lang="ts">
import confetti from 'canvas-confetti'
import { inBrowser } from 'vitepress';

if (inBrowser) {
  var end = Date.now() + (3 * 1000);

  // go Buckeyes!
  var colors = ['#bb0000', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());

}
</script>
