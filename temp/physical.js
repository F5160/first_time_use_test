document.addEventListener('DOMContentLoaded', function() {
  const inputContainer = document.getElementById('inputContainer');
  const inputF = document.getElementById('inputF');
  const inputTemperature = document.getElementById('inputTemperature');
  const decimalPlacesInput = document.getElementById('decimalPlaces');
  const calculateButton = document.getElementById('calculateButton');
  const resultElement_count = document.getElementById('result_count');
  const resultElement_bochang = document.getElementById('result_bochang');
  const resultElement_bochang_data = document.getElementById('result_bochang_data');
  const resultElement_bochang_data_warning = document.getElementById('result_bochang_data_warning');
  const resultElement_bosu = document.getElementById('result_bosu');
  const resultElement_bosu_data = document.getElementById('result_bosu_data');
  const resultElement_bosu_data_warning = document.getElementById('result_bosu_data_warning');
  const resultElement_lilunshengsu = document.getElementById('result_lilunshengsu');
  const resultElement_lilunshengsu_data = document.getElementById('result_lilunshengsu_data');
  const resultElement_xiangduiwucha = document.getElementById('result_xiangduiwucha');
  const resultElement_xiangduiwucha_data = document.getElementById('result_xiangduiwucha_data');
  const resultElement_xiangduiwucha_data_warning = document.getElementById('result_xiangduiwucha_data_warning');
  const resultElement_xiangduiwucha_data_accurate = document.getElementById('result_xiangduiwucha_data_accurate');
  const resultElement_xiangduiwucha_data_perfect = document.getElementById('result_xiangduiwucha_data_perfect');
  const warningElement = document.getElementById('input_warning');
  const successElement = document.getElementById('input_success');
  const inputwarning = document.getElementById('input_warning');
  const inputsuccess = document.getElementById('input_success');
  const conclusionElement = document.getElementById('conclusion');
  const shine_shadow = document.getElementById('shine_shadow');

  for (let i = 0; i < 10; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = `x${i}`;
    inputContainer.appendChild(input);
  }

  let success_count = 0;

  // 监听按钮点击事件
  calculateButton.addEventListener('click', function(event) {
    const waveNodes = inputContainer.querySelectorAll('input[type="number"]');
    // 遍历每个输入框并检查是否为空
    let allFilled = true;
    waveNodes.forEach(input => {
        if (input.value.trim() === '') {
            allFilled = false;
        }
    });
    if (inputF.value.trim() === '' || inputTemperature.value.trim() === '' || decimalPlacesInput.value.trim() === '') {
        allFilled = false;
    }
    
    if (!allFilled) {
      successElement.textContent = ``;
      warningElement.textContent = `数据冇填完啊靓仔!`;
      inputwarning.style.opacity = '1';
      inputwarning.classList.remove('flash');
      setTimeout(function() {
        inputwarning.classList.add('flash');
      }, 10);
      event.preventDefault();  // 阻止提交
    } else {
      success_count+=1;
      warningElement.textContent = ``;
      successElement.textContent = `Success! 第${success_count}次计算`;
      inputsuccess.style.opacity = '1';
      inputsuccess.classList.remove('flash');
      setTimeout(function() {
        inputsuccess.classList.add('flash');
      }, 10);

      const inputs = inputContainer.querySelectorAll('input');
      const temperature = parseFloat(inputTemperature.value);
      const F = parseFloat(inputF.value);
      const T0 = 237.15;
      const u0 = 331.45;
      const decimalPlaces = parseInt(decimalPlacesInput.value, 10);
      let sum_first_half = 0;
      let sum_last_half = 0;

      // 计算(固定10个数据)
      inputs.forEach((input, index) => {
          const value = parseFloat(input.value);
          if (!isNaN(value)) {
              if (index < 5) {
                  sum_first_half += value;
              } else {
                  sum_last_half += value;
              }
          }
      });

      const result_bochang = (sum_last_half - sum_first_half) / 12.5;
      const result_bosu = F * result_bochang;
      const result_lilunshengsu = u0 * (Math.sqrt(1 + temperature / T0));
      const result_xiangduiwucha = 100 * (Math.abs(result_bosu - result_lilunshengsu) / result_lilunshengsu);

      const abs_result_bochang = Math.abs(result_bochang).toFixed(decimalPlaces);
      const abs_result_bosu = Math.abs(result_bosu).toFixed(decimalPlaces);
      const abs_result_lilunshengsu = Math.abs(result_lilunshengsu).toFixed(decimalPlaces);
      const abs_result_xiangduiwucha = Math.abs(result_xiangduiwucha).toFixed(decimalPlaces);

      resultElement_count.textContent = `第${success_count}次结算结果显示: `;

      resultElement_bochang.textContent = `计算的波长 = `;
      if(abs_result_bochang==0) {
        resultElement_bochang_data_warning.textContent = `${abs_result_bochang}mm  检查实验数据是否准确`;
        resultElement_bochang_data.textContent = ``;
      }else {
        resultElement_bochang_data.textContent = `${abs_result_bochang}mm`;
        resultElement_bochang_data_warning.textContent = ``;
      }

      resultElement_bosu.textContent = `计算的波速 = `;
      if(abs_result_bosu==0) {
        resultElement_bosu_data_warning.textContent = `${abs_result_bosu}m/s  检查实验数据是否准确`;
        resultElement_bosu_data.textContent = ``;
      }else {
        resultElement_bosu_data.textContent = `${abs_result_bosu}m/s`;
        resultElement_bosu_data_warning.textContent = ``;
      }
      
      resultElement_lilunshengsu.textContent = ` 在当前温度(${temperature}°C)下的理论声速 = `;
      resultElement_lilunshengsu_data.textContent = `${abs_result_lilunshengsu}m/s`;
      
      resultElement_xiangduiwucha.textContent = ` 实验值与理论值的相对误差 = `;
      if(abs_result_xiangduiwucha<0.1) {
        resultElement_xiangduiwucha_data_perfect.textContent = `${abs_result_xiangduiwucha}%  完美无瑕!`;
        resultElement_xiangduiwucha_data.textContent = ``;
        resultElement_xiangduiwucha_data_warning.textContent = ``;
        resultElement_xiangduiwucha_data_accurate.textContent = ``;
        // 炫光动画
        const shining = document.createElement('div');
        shining.className = 'shining';
        shine_shadow.appendChild(shining);
        shining.classList.add('fade-in');
        setTimeout(() => {
          shining.classList.remove('fade-in');
          shining.classList.add('hold');
        }, 150);
        setTimeout(() => {
          shining.classList.remove('hold');
          shining.classList.add('fade-out');
        }, 3150);
        setTimeout(() => {
          shine_shadow.removeChild(shining);
        }, 5650);
      }
      else if(abs_result_xiangduiwucha<1) {
        resultElement_xiangduiwucha_data_accurate.textContent = `${abs_result_xiangduiwucha}%  手感上佳`;
        resultElement_xiangduiwucha_data.textContent = ``;
        resultElement_xiangduiwucha_data_warning.textContent = ``;
        resultElement_xiangduiwucha_data_perfect.textContent = ``;
      }else if(abs_result_xiangduiwucha<10) {
        resultElement_xiangduiwucha_data.textContent = `${abs_result_xiangduiwucha}%`;
        resultElement_xiangduiwucha_data_warning.textContent = ``;
        resultElement_xiangduiwucha_data_accurate.textContent = ``;
        resultElement_xiangduiwucha_data_perfect.textContent = ``;
      }else {
        resultElement_xiangduiwucha_data_warning.textContent = `${abs_result_xiangduiwucha}%  检查实验数据是否准确`;
        resultElement_xiangduiwucha_data.textContent = ``;
        resultElement_xiangduiwucha_data_accurate.textContent = ``;
        resultElement_xiangduiwucha_data_perfect.textContent = ``;
      }
      
      conclusionElement.textContent = `结论: 经实验测得, 超声波在空气中的传播速度为: ${abs_result_bosu}m/s, 在当前温度(${temperature}°C)下, 声速的理论值为: ${abs_result_lilunshengsu}m/s, 实验相对理论的百分误差为: ${abs_result_xiangduiwucha}%`;
    }

  });

  window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '走了数据就莫得了，确定要离开页面吗?';
    return '走了数据就莫得了，确定要离开页面吗?';
  });
  
});