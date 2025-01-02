// 기간선택
// import { openModal, closeModal } from "../js/ui_common.js";
export const rangeOptionSelector = (start, end) => {
    const startDateInput = document.getElementById(start);
    const endDateInput = document.getElementById(end);
    const radioButtons = document.querySelectorAll('input[name="type"]');

    const updateDates = (value) => {
        const today = dayjs().format('YYYY-MM-DD');
        let startDate;
        let endDate = today;
        endDateInput.value = endDate;   

        switch (value) {
            case '1week':
                startDate = dayjs(endDate).subtract(1, 'week').format('YYYY-MM-DD');                
                startDateInput.value = startDate;
                break;
            case '1month':
                startDate = dayjs(endDate).subtract(1, 'month').format('YYYY-MM-DD');
                startDateInput.value = startDate;                
                break;
            case '3month':
                startDate = dayjs(endDate).subtract(3, 'month').format('YYYY-MM-DD');   
                startDateInput.value = startDate;        
                break;
            case '6month':
                startDate = dayjs(endDate).subtract(6, 'month').format('YYYY-MM-DD');
                startDateInput.value = startDate;             
                break;
            default:
                startDate = null;
                endDate = null;
        }
    };

    radioButtons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            updateDates(event.target.value);
        });
    });
};

export class DateRangePicker {
    constructor(startDateId, endDateId) {
        this.startDateInput = document.getElementById(startDateId);
        this.endDateInput = document.getElementById(endDateId);

        if (!this.startDateInput || !this.endDateInput) {            
            return;
        }

        const today = dayjs().format('YYYY-MM-DD');
        this.startDateInput.value = today;
        this.endDateInput.value = today;

        this.startDateInput.addEventListener('change', this.handleStartDateChange.bind(this));
        this.endDateInput.addEventListener('change', this.handleEndDateChange.bind(this));
    }

    handleStartDateChange() {
        const startDate = dayjs(this.startDateInput.value);
        const endDate = dayjs(this.endDateInput.value);

        if (startDate.isAfter(endDate)) {
            this.endDateInput.value = this.startDateInput.value;
        }
    }

    handleEndDateChange() {
        const startDate = dayjs(this.startDateInput.value);
        const endDate = dayjs(this.endDateInput.value);

        if (endDate.isBefore(startDate)) {
            alert('종료일은 시작일보다 이전일 수 없습니다. 시작일로 설정됩니다.');
            this.endDateInput.value = this.startDateInput.value;
        }
    }
}

// 일간 캘린터
export const dayCalendar = (containerId, option) => {
    const today = dayjs().format('YYYY년 MM월 DD일');
    const formatMonth = dayjs().format('YYYY년 MM월'); // option.formatType 을 위한 노출 형식
    const formatYear = dayjs().format('YYYY년'); // option.formatType 을 위한 노출 형식
    if(!containerId) {
        return;
    }
    
    const container = document.querySelector(containerId)
    const todayDisplay = container.querySelector('.today-display');
    
    if(option.formatType == 'YYYY') {
        todayDisplay.innerText = formatYear;
    } else if(option.formatType == 'YYYY-MM') {
        todayDisplay.innerText = formatMonth;
    }
    else {
        todayDisplay.innerText = today;
    }

    const preButton = container.querySelector('.btn-prev');
    const nextButton = container.querySelector('.btn-next');
    
    let currentDate = dayjs();
    let selectedMealType = ''; 

    const displayCalendar = (date) => {     
        if(currentDate) {
            console.log('오늘')
        }   
        // option.formatType 날짜 노출 포맷
        if(option.formatType == 'YYYY') {
            todayDisplay.innerText = date.format('YYYY년');
        } else if(option.formatType == 'YYYY-MM') {
            todayDisplay.innerText = date.format('YYYY년 MM월');
        }
        else {
            todayDisplay.innerText = date.format('YYYY년 MM월 DD일');
        }
        
    };

    preButton && preButton.addEventListener('click', () => {
        currentDate = currentDate.subtract(1, 'day'); // option.formatType 과 관계없이 1일씩 증감
        displayCalendar(currentDate);
        console.log('선택한 날짜', currentDate.format('YYYY년 MM월 DD일')); 
    });

    nextButton && nextButton.addEventListener('click', () => {
        currentDate = currentDate.add(1, 'day');
        displayCalendar(currentDate);
        console.log('선택한 날짜', currentDate.format('YYYY년 MM월 DD일')); 
    });

    if (option.mealType) {
        const mealTypes = document.querySelectorAll('.btn-meal-type');
        mealTypes.forEach((mealType) => {
            mealType.addEventListener('click', () => {
                const activeMealType = document.querySelector('.btn-meal-type.is-active');
                if (activeMealType) {
                    activeMealType.classList.remove('is-active');
                }
                mealType.classList.add('is-active');
                selectedMealType = mealType.innerText; 
                console.log('선택한 날짜', currentDate.format('YYYY년 MM월 DD일'), '선택한 끼니 유형:', selectedMealType);  
            });
        });
    }

    if(option.modal) {
        const selectButton = document.querySelector('.btn-primary');
        // selectButton.addEventListener('click', () => {        
        //     document.querySelector('.show-data').innerText = `${currentDate.format('YYYY년 MM월 DD일')} - ${selectedMealType}`;
        //     console.log('선택한 날짜:', currentDate.format('YYYY년 MM월 DD일'), selectedMealType);        
        //     document.querySelector('.modal-datepicker.is-active .close-modal').click();    
        // });
    }
    // 초기 날짜 표시
    displayCalendar(currentDate);
    console.log('선택한 날짜', currentDate.format('YYYY년 MM월 DD일'));    
};

// 월간 달력
/************************
 * day.js 필수
 ************************/
export const newMonthlyCalendar = (containerId, options) => {
    const mergedOptions = {
        button: false,
        displayData: 'default',
        dayClickCallback: null,
        toggle: false,
        userTitle: '',
        userTouchMove: false,
        addCalendarData: null, // 사용자 데이터를 추가하는 함수
        ...options
    };

    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    let currentDate = dayjs();
    let todayRowIndex = null; 
    let currentRowIndex = 0;  
    const currentMonth = dayjs().format('YYYYMM');
    let isMonth = null;
    let datepickerCustom; // datepicker 

    // 화면 로드 시 오늘 날짜 데이터를 불러오고 표시
    if (mergedOptions.dayClickCallback) {
        mergedOptions.dayClickCallback(currentDate.format('YYYYMMDD'));
    }
    
    if(mergedOptions.userTitle) {
        const calendarTitle = document.createElement('div');
        calendarTitle.classList.add('calendar__title');
        calendarTitle.innerText = mergedOptions.userTitle;
        container.prepend(calendarTitle)
    }

    // 현재 달 여부를 구하는 함수
    const getTodayRowIndex = (date) => {
        const isCurrentMonth = date.format('YYYYMM') === currentMonth;
        return isCurrentMonth;
    };  
    
    displayCalendar(currentDate);

    // 현재 날짜로 이동 버튼
    container.querySelector('.calendar__header .btn-show-today')?.addEventListener('click', () => {
        currentDate = dayjs();
        displayCalendar(currentDate);
        isMonth = getTodayRowIndex(currentDate); 
        if (mergedOptions.dayClickCallback) {
            mergedOptions.dayClickCallback(currentDate.format('YYYYMMDD'));
        }
        // datePicker 의 캘린더도 동일하게 현재 날짜로 이동
        if (datepickerCustom) {
            datepickerCustom.setDate(currentDate.format('YYYY-MM-DD'));
        }
    });

    // 이전/다음 달 이동 버튼
    if (mergedOptions.button) {
        container.querySelector('.calendar__header .btn-prev-month')?.addEventListener('click', () => {
            currentDate = currentDate.subtract(1, 'month');
            displayCalendar(currentDate);
            isMonth = getTodayRowIndex(currentDate);    
            // datePicker 의 캘린더도 동일하게 이전달로 이동
            if (datepickerCustom) {
                datepickerCustom.setDate(currentDate.format('YYYY-MM-DD'));
            }        
        });

        container.querySelector('.calendar__header .btn-next-month')?.addEventListener('click', () => {
            currentDate = currentDate.add(1, 'month');
            displayCalendar(currentDate);
            isMonth = getTodayRowIndex(currentDate);     
            // datePicker 의 캘린더도 동일하게 다음달로 이동   
            if (datepickerCustom) {
                datepickerCustom.setDate(currentDate.format('YYYY-MM-DD'));
            }       
        });
    } else {
        const buttons = container.querySelectorAll('.calendar__header button');
        buttons.forEach(button => button.style.display = 'none');
    }


    // 터치 이벤트 핸들러
    const handleTouchStart = (event) => {
        start_xPos = event.touches[0].pageX;
        start_yPos = event.touches[0].pageY;
        start_time = new Date();
    };

    const handleTouchEnd = (event) => {
        const end_xPos = event.changedTouches[0].pageX;
        const end_yPos = event.changedTouches[0].pageY;
        const end_time = new Date();
        const move_x = end_xPos - start_xPos;
        const move_y = end_yPos - start_yPos;
        const elapsed_time = end_time - start_time;
        if (Math.abs(move_x) > min_horizontal_move && Math.abs(move_y) < max_vertical_move && elapsed_time < within_ms) {
            if (move_x < 0) {
                currentDate = currentDate.add(1, 'month');
                // datePicker 의 캘린더도 동일하게 다음달로 이동   
                if (datepickerCustom) {
                    datepickerCustom.setDate(currentDate.format('YYYY-MM-DD'));
                } 
            } else {
                currentDate = currentDate.subtract(1, 'month');
                // datePicker 의 캘린더도 동일하게 이전달로 이동   
                if (datepickerCustom) {
                    datepickerCustom.setDate(currentDate.format('YYYY-MM-DD'));
                } 
            }
            displayCalendar(currentDate);     
            isMonth = getTodayRowIndex(currentDate); 
            console.log('aa',isMonth)          
        }
    };

    const min_horizontal_move = 30;
    const max_vertical_move = 30;
    const within_ms = 1000;
    let start_xPos, start_yPos, start_time;

    if(mergedOptions.userTouchMove) {
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);
    }


    // 드롭다운 옵션 생성
    const buildDropdownOptions = (currentDate) => {
        const select = document.createElement('select');
        for (let i = 0; i < 15; i++) {
            const optionDate = currentDate.subtract(i, 'month');
            const optionValue = optionDate.format('YYYY-MM');
            const optionText = optionDate.format('YYYY년 M월');
            const option = document.createElement('option');
            option.value = optionValue;
            option.textContent = optionText;
            select.appendChild(option);
        }
        return select;
    };

    if (mergedOptions.displayData === 'dropdown') {
        const displayData = container.querySelector('.display-data');
        const select = buildDropdownOptions(currentDate);
        displayData.innerHTML = '';
        displayData.appendChild(select);

        select.addEventListener('change', function(event) {
            const selectedValue = event.target.value;
            currentDate = dayjs(selectedValue);
            displayCalendar(currentDate);
        });
    }

    // datePicker modal 생성
    function writeDatePickerFn (modalId, datePickerId) {
        const content = document.querySelector('.wrap .content')
        const datePickerWrap = document.createElement('div'); // modal 최상위 wrapper
        const datePickerContainer = document.createElement('div');
        const datePickerHeader = document.createElement('div'); // modal header
        const datePickerContent = document.createElement('div'); // modal content
        const modalTitle = document.createElement('h3'); // 날짜를 선택해 주세요
        const modalCloseButton = document.createElement('button') // closeModal button
        const modalCloseButtonIR = document.createElement('span') // closeModal button IR-text

        datePickerWrap.classList.add('modal__wrap--bg', 'type-bottom', 'modal-datepicker', 'test');
        datePickerWrap.setAttribute('id', modalId);

        // .wrap .content 다음에 datePicker 추가
        content.insertAdjacentElement('afterend', datePickerWrap);

        // .wrap > .modal__wrap
        datePickerContainer.classList.add('modal__wrap');
        datePickerWrap.appendChild(datePickerContainer);

        // .wrap > .modal-header
        datePickerHeader.classList.add('modal-header');

        // .wrap > .modal-header > h3.font-type-h3{날짜를 선택해 주세요}
        modalTitle.classList.add('font-type-h3');
        modalTitle.textContent = '날짜를 선택해 주세요';

        // .wrap > .modal-header .btn
        modalCloseButton.setAttribute('type', 'button');
        modalCloseButton.classList.add('btn', 'btn-icon-close', 'close-modal');
        modalCloseButton.addEventListener('click', () => {
            closeModal(event)
        });

        // .wrap > .modal-header .button > .ir-text
        modalCloseButtonIR.classList.add('ir-text');
        modalCloseButtonIR.textContent = "닫기";
        // .wrap > .modal-header .button > .ir-text 추가
        modalCloseButton.appendChild(modalCloseButtonIR);

        // .wrap > .modal-header > h3 + .btn 추가
        datePickerHeader.appendChild(modalTitle);
        datePickerHeader.appendChild(modalCloseButton);
        datePickerContainer.appendChild(datePickerHeader);

        // .wrap > .modal-cont[id='mergedOptions.datePickerElId']
        datePickerContent.classList.add('modal-cont');
        datePickerContent.setAttribute('id', datePickerId);
        datePickerContainer.appendChild(datePickerContent);
    }

    // datePicker 버튼 생성
    function addDatePickerFn(modalId) {
        const datePickerEl = document.createElement('button');
        const displayData = container.querySelector('.display-data');
        displayData.classList.add('datepicker-custom');
        datePickerEl.classList.add('today-date', 'text-2xl', 'font-extrabold');
        datePickerEl.setAttribute('modal-id', modalId);
        datePickerEl.textContent = currentDate.format('YYYY년 M월 D일');
        displayData.appendChild(datePickerEl);
    }

    // 캘린더 표시
    function displayCalendar(date) {
        const displayData = container.querySelector('.display-data');
        const tableBody = container.querySelector('.calendar__content tbody');
        
        if (mergedOptions.displayData === 'dropdown') {
            const select = displayData.querySelector('select');
            if (select) {
                select.value = date.format('YYYY-MM');
            }
        } else if (mergedOptions.displayData === 'datePicker') {
            const datePickerButton = document.querySelector('.display-data button');
            if(datePickerButton){
                datePickerButton.textContent= date.format('YYYY년 M월 D일')
            }
        }
        else {
            if(options.useAttendance) { // 출석체크 사용 시
                displayData.textContent = date.format('YYYY.M');
            } else {
                displayData.textContent = date.format('YYYY년 M월 D일');
            }
        }

        const firstDayOfMonth = date.startOf('month').day();
        const daysInMonth = date.daysInMonth();
        const lastDayOfPrevMonth = date.subtract(1, 'month').endOf('month').date();
        date.add(1, 'month'); // date 상태 복구
        const firstDayOfNextMonth = date.startOf('month').date();

        tableBody.innerHTML = '';
        let dayIndex = 0;
        let row = tableBody.insertRow();

        // 이전 달 날짜 표시
        for (let i = 0; i < firstDayOfMonth; i++) {
            const cell = row.insertCell();
            const prevMonthDay = lastDayOfPrevMonth - (firstDayOfMonth - i - 1);
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = prevMonthDay;
            cell.appendChild(link);
            cell.classList.add('gray');
            dayIndex++;
        }

        // 연속 출석체크한 일자 계산
        let attendanceContinue = 0;
        let attendanceMax = 0; // 연속 출석일 중 제일 큰 수
        const attendanceDay = document.querySelector('.calendar__header .calendar__attendance-text__day'); // 연속 출석일 노출

        // 이번 달 날짜 표시
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = row.insertCell();
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = day;
            cell.appendChild(link);

            // 이벤트 > 출석체크 달력 : 이번 달 출석체크 했었던 날짜에 아이콘 노출
            if(options.useAttendance) { // 출석체크 사용 여부 확인
                if (options.checkedAttendance){ // 출석한 날짜 확인
                    const iconAttendance = document.createElement('i'); // 출석체크 아이콘
                    const iconAttendanceIR = document.createElement('span'); // IR 텍스트 : N일 출석체크 완료

                    iconAttendance.classList.add('icon-attendance');
                    iconAttendanceIR.classList.add('ir-text');
                    iconAttendanceIR.textContent = day + "일 출석체크 완료"

                    options.checkedAttendance.forEach((target) => {
                        if(day == target) {
                            link.textContent ='';
                            link.appendChild(iconAttendance);
                            link.appendChild(iconAttendanceIR);
                            cell.appendChild(link);
                            cell.classList.add('attendance');
                        }
                    });
                } 

                // 연속 출석체크한 일자를 계산
                if(cell.classList.contains('attendance')) {
                    attendanceContinue = attendanceContinue + 1;
                    if(attendanceMax < attendanceContinue) {
                        attendanceMax = attendanceContinue;
                    }
                } else {
                    attendanceContinue = 0;
                }
                attendanceDay.innerText = attendanceMax; // 연속 출석체크한 일자를 세어 제일 큰 수를 노출
            }
            
            // 사용자 데이터 추가
            if (typeof mergedOptions.addCalendarData === 'function') {
                const currentDate = date.date(day);
                // 오늘 날짜까지 데이터 추가
                if (currentDate.isBefore(dayjs().add(1, 'day'), 'day')) { // 'today'까지 포함하기 위해 add(1, 'day') 사용
                    mergedOptions.addCalendarData(cell, currentDate); // cell에 사용자 데이터 추가
                }
            }


            link.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedDay = handleDayClick(date, day);
                if (mergedOptions.dayClickCallback) {
                    mergedOptions.dayClickCallback(selectedDay);
                }
            });

            if (date.date(day).isSame(dayjs(), 'day')) {
                cell.classList.add('today');
                todayRowIndex = currentRowIndex;
            }

            const weekday = (firstDayOfMonth + day - 1) % 7;
            if (weekday === 0 || weekday === 6) {
                cell.classList.add('holiday');
            }

            if (++dayIndex % 7 === 0 && day < daysInMonth) {
                row = tableBody.insertRow();
                currentRowIndex++;
            }
        }

        // 다음 달 날짜 표시
        let nextMonthDay = 1;
        while (dayIndex % 7 !== 0) {
            const cell = row.insertCell();
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = nextMonthDay;
            cell.appendChild(link);
            cell.classList.add('gray');
            dayIndex++;
            nextMonthDay++;
        }

        // 빈 칸 채우기
        const remainingCells = 7 - (dayIndex % 7);
        if (remainingCells !== 7) {
            for (let i = 0; i < remainingCells; i++) {
                const cell = row.insertCell();
                cell.classList.add('gray');
            }
        }     

    }

    // displayData : datePicker 인 경우 텍스트에서 datePicker 버튼으로 변경
    if (mergedOptions.displayData === 'datePicker') {
        addDatePickerFn(mergedOptions.datePickerModalId);
        writeDatePickerFn(mergedOptions.datePickerModalId, mergedOptions.datePickerElId);
        const todayDate = dayjs().format('YYYY년 M월 D일');
        const elem1 = document.querySelectorAll('#'+mergedOptions.datePickerElId);
        elem1.forEach((el) => {
            datepickerCustom = new Datepicker(el, {
                // ...options
                buttonClass: 'btn',
                autoClose: true,
                format: 'yyyy-m-d',
                language: 'ko'
            },);
            if (document.querySelector('.today-date')) {
                document.querySelector('.today-date').innerText = todayDate;
            }
            // 날짜가 선택되었을 때 콘솔에 출력
            el.addEventListener('changeDate', function (event) {
                const selectedDate = event.detail.date;
                const displayDate = dayjs(selectedDate).format('YYYY년 M월 D일');
                document.querySelector('.today-date').innerText = displayDate;
                document.querySelector('.close-modal').click();
            });
            
            // datePicker > 캘린더 이전/다음달 보기 버튼 클릭 시 월간 캘린더 동일하게 이동
            document.querySelector('.datepicker-picker .datepicker-controls .prev-button')?.addEventListener('click', () => {
                currentDate = currentDate.subtract(1, 'month');
                displayCalendar(currentDate);
                isMonth = getTodayRowIndex(currentDate);            
            });
            document.querySelector('.datepicker-picker .datepicker-controls .next-button')?.addEventListener('click', () => {
                currentDate = currentDate.add(1, 'month');
                displayCalendar(currentDate);
                isMonth = getTodayRowIndex(currentDate);     
            });

            const modalOpenButton = document.querySelectorAll('.datepicker-custom button.today-date');
            modalOpenButton.forEach((target) => {
                target.addEventListener('click', () => {
                    openModal(event)
                });
            });
        });
        
    }

    // 주간 월간 토글 기능    
    const setupCalendarToggle = (todayRowIndex, mergedOptions) => {
        const toggleButton = container.querySelector('.btn-calendar-toggle');
        const toggleButtonText = toggleButton.querySelector('.ir-text');
        const allTrs = container.querySelectorAll('.calendar__content tbody tr');
    
        if(!toggleButton) {
            return;
        }

        const toggleView = () => {
            isMonth = getTodayRowIndex(currentDate);            
            const irText = toggleButtonText.innerText;            
            toggleButtonText.innerText = irText === '월간보기' ? '주간보기' : '월간보기';
            toggleButton.classList.toggle('is-active');
            const allTrs = container.querySelectorAll('.calendar__content tbody tr');

            if(isMonth && toggleButton.classList.contains('is-active')) {
                allTrs.forEach(tr => tr.classList.remove('hide'));
                toggleButton.classList.add('is-active');                  
                container.querySelector('.calendar__header .btn-prev-month').style.display = 'block';
                container.querySelector('.calendar__header .btn-next-month').style.display = 'block';
                // container.querySelector('.calendar__header .btn-show-today').style.display = 'block';     
                mergedOptions.userTouchMove = true;  
                container.addEventListener('touchstart', handleTouchStart);
                container.addEventListener('touchend', handleTouchEnd);
            } else if(isMonth && !toggleButton.classList.contains('is-active')) {
                allTrs.forEach(tr => tr.classList.add('hide'));
                allTrs[todayRowIndex].classList.remove('hide');
                allTrs[todayRowIndex].classList.add('show');
                container.querySelector('.calendar__header .btn-prev-month').style.display = 'none';
                container.querySelector('.calendar__header .btn-next-month').style.display = 'none';
                // container.querySelector('.calendar__header .btn-show-today').style.display = 'none';  
                mergedOptions.userTouchMove = false;
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchend', handleTouchEnd);
            } else if (!isMonth && toggleButton.classList.contains('is-active')) {
                allTrs.forEach(tr => tr.classList.remove('hide'));
                allTrs[0].classList.remove('hide');
                allTrs[0].classList.add('show');
                container.querySelector('.calendar__header .btn-prev-month').style.display = 'block';
                container.querySelector('.calendar__header .btn-next-month').style.display = 'block';
                // container.querySelector('.calendar__header .btn-show-today').style.display = 'block';   
                mergedOptions.userTouchMove = true;
                container.addEventListener('touchstart', handleTouchStart);
                container.addEventListener('touchend', handleTouchEnd);
            } else if (!isMonth && !toggleButton.classList.contains('is-active')) {
                allTrs.forEach(tr => tr.classList.add('hide'));
                allTrs[0].classList.remove('hide');
                allTrs[0].classList.add('show');
                container.querySelector('.calendar__header .btn-prev-month').style.display = 'none';
                container.querySelector('.calendar__header .btn-next-month').style.display = 'none';
                // container.querySelector('.calendar__header .btn-show-today').style.display = 'none';  
                mergedOptions.userTouchMove = false;
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchend', handleTouchEnd);
            }
        };
    
        if (mergedOptions.toggle !== false) {
            toggleButtonText.innerText = '월간보기';
            toggleButton.style.display = 'block';
            allTrs.forEach(tr => tr.classList.add('hide'));
            allTrs[todayRowIndex].classList.remove('hide');
            allTrs[todayRowIndex].classList.add('show');
            toggleButton.addEventListener('click', toggleView);
        } else {
            toggleButton.style.display = 'none';
        }
    };   
    if(mergedOptions.toggle) {
        setupCalendarToggle(todayRowIndex, mergedOptions);    
        container.querySelector('.calendar__header .btn-prev-month').style.display = 'none';
        container.querySelector('.calendar__header .btn-next-month').style.display = 'none'; 
        // container.querySelector('.calendar__header .btn-show-today').style.display = 'none';
        mergedOptions.userTouchMove = false;
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
    }  
}; 


// 주간달력
/************************
 * day.js 필수, swiping 기능 사용지 swiper 
 * startDate: '2024.01',  시작 년도 설정가능(예: 회원가입 일 이후) 
 * button: false, 이전 다음 버튼 사용여부
 * displayDay: 'none', 타이틀에 날짜 표시 onlyToday, WeeklyRange, onlyMonthly, none
 * userSwiping: true  스와이핑 기능 사용
 ************************/
// import { swiperCustom } from "../../assets/js/swiper_custom.js";
export const createWeeklyCalendar = (containerId, options = {}) => {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    // dom 생성
    const basicTemplate = `
        <div class="calendar__header">
            <div class="display-data"></div>
        </div>
        <div class="calendar__content">
            <ul class="weekly-cal__header" id="weeklyLabels"></ul>
            <ul id="weekDates"></ul>
            <div class="swiper calendar-swiper">
                <div class="swiper-wrapper">
                </div>
            </div>                            
        </div>
    `;
    container.innerHTML = basicTemplate;
    const calendarHeader = container.querySelector('.calendar__header');

    // Day.js 한국어 로케일 설정
    dayjs.locale('ko');
    dayjs.extend(window.dayjs_plugin_isSameOrBefore);

    let currentDate = dayjs();
    let datepickerCustom; // datepicker 
    const weeksCount = displayWeeklyCalendar(currentDate) + 5; // 최초 호출시 weeksCount 반환

    const startOfWeek = currentDate.clone().startOf('week');
    const endOfWeek = currentDate.clone().endOf('week');
    const titleType = options.displayDay;
    
    const displayWeeklyTitle = (titleType, day) => {
        const displayData = container.querySelector('.display-data');
        if (titleType === 'WeeklyRange') {
            displayData.textContent = `${day.format('MM.DD')} - ${endOfWeek.format('MM.DD')}`;
        } else if (titleType === 'onlyToday') {
            displayData.textContent = `${day.format('YYYY-MM-DD')}`;
        } else if (titleType === 'onlyMonthly') {
            displayData.textContent = `${day.format('YYYY-MM')}`;
        } else if (titleType === 'none') {
            displayData.textContent = '';
        }           
    };
    
    if (options.swiperOptions) {
        options.swiperOptions.on = {
            slideNextTransitionEnd: (swiper) => {
                const newWeekFStartDay = startOfWeek.clone().add(7, 'day');
                displayWeeklyTitle(titleType, newWeekFStartDay);
                currentDate = currentDate.add(1, 'week');
                displayWeeklyCalendar(currentDate);
            },
            slidePrevTransitionEnd: (swiper) => {
                const newWeekPStartDay = startOfWeek.clone().subtract(7, 'day');
                displayWeeklyTitle(titleType, newWeekPStartDay);
                currentDate = currentDate.subtract(1, 'week');
                displayWeeklyCalendar(currentDate);
            }
        };
        const swiperNextButton = document.createElement('button');
        swiperNextButton.classList.add('swiper-button-next');
        const swiperPrevButton = document.createElement('button');
        swiperPrevButton.classList.add('swiper-button-prev');        
        calendarHeader.appendChild(swiperNextButton)
        calendarHeader.appendChild(swiperPrevButton)

        const swiper = swiperCustom('.calendar-swiper', 1, options.swiperOptions);
        swiper.slideTo(weeksCount);
        
    }
    
    // 캘린더 헤더에 이전달, 다음달 버튼 설정
    if (options.button) {
        const prevButton = document.createElement('button');
        prevButton.id = 'prevWeek';
        prevButton.textContent = '이전 주';
        calendarHeader.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.id = 'nextWeek';
        nextButton.textContent = '다음 주';
        calendarHeader.appendChild(nextButton);

        prevButton.addEventListener('click', function () {
            currentDate = currentDate.subtract(1, 'week');
            displayWeeklyCalendar(currentDate);
        });

        nextButton.addEventListener('click', function () {
            currentDate = currentDate.add(1, 'week');
            displayWeeklyCalendar(currentDate);
        });
    }

    if (!options.userSwiping) {
        const handleTouchStart = (event) => {
            start_xPos = event.touches[0].pageX;
            start_yPos = event.touches[0].pageY;
            start_time = new Date();
        };

        const handleTouchEnd = (event) => {
            const end_xPos = event.changedTouches[0].pageX;
            const end_yPos = event.changedTouches[0].pageY;
            const end_time = new Date();
            let move_x = end_xPos - start_xPos;
            let move_y = end_yPos - start_yPos;
            let elapsed_time = end_time - start_time;
            if (Math.abs(move_x) > min_horizontal_move && Math.abs(move_y) < max_vertical_move && elapsed_time < within_ms) {
                if (move_x < 0) {
                    currentDate = currentDate.add(1, 'week');
                    displayWeeklyCalendar(currentDate);
                } else {
                    currentDate = currentDate.subtract(1, 'week');
                    displayWeeklyCalendar(currentDate);
                }
            }
        };

        const min_horizontal_move = 30;
        const max_vertical_move = 30;
        const within_ms = 1000;

        let start_xPos;
        let start_yPos;
        let start_time;

        container && container.addEventListener('touchstart', handleTouchStart);
        container && container.addEventListener('touchend', handleTouchEnd);
    }  


    function displayWeeklyCalendar(date) {
        const displayData = container.querySelector('.display-data');
        const weekDatesList = container.querySelector('#weekDates');
        const weeklyLabels = container.querySelector('#weeklyLabels');
        const swipingContainer = container.querySelector('.swiper-wrapper');
    
        // 요소가 존재하는지 확인
        if (!displayData || !weekDatesList || !weeklyLabels || (options.userSwiping && !swipingContainer)) {
            return;
        }
    
        // 주의 시작일을 설정
        const weekStartDay = options.weekStart === 1 ? '일' : '월';
        const startOfWeek = date.startOf('week', weekStartDay);
        const endOfWeek = date.endOf('week', weekStartDay);
        const todayDayIndex = dayjs().day(); // 오늘의 요일 인덱스
        const futureLimit = options.futureLimit;
        const endLimitDay = endOfWeek.add(futureLimit, 'weeks');
        
        let pastStartDay = options.startDate;        
        let firstStart = dayjs(pastStartDay, 'YYYY.M').startOf('month');
        let currentDay = endLimitDay.startOf('week');

        const displayDatePicker = container.querySelector('.datepicker-custom button.today-date');
    
        // 제목 사용시 오늘 날짜를 보여줄지 한주의 시작일과 종료일을 보여줄지 선택
        // 제목 타입을 데이터피커 버튼으로 사용할지 선택
        const displayDateTitle = (type, num) => {
            if (type === 'WeeklyRange') {
                displayData.textContent = `${startOfWeek.format('MM.DD')} - ${endOfWeek.format('MM.DD')}`;
            } else if (type === 'onlyToday') {
                displayData.textContent = dayjs().format('YYYY-MM-DD');
            } else if (type === 'onlyMonthly') {
                displayData.textContent = dayjs().format('YYYY-MM');
            } else if (type === 'none') {
                displayData.textContent = '';
            }
        };        
        
        displayDateTitle(options.displayDay);
    
        // 요소를 비우기 전에 존재하는지 확인
        if (weekDatesList && weeklyLabels) {
            weekDatesList.innerHTML = '';
            weeklyLabels.innerHTML = '';
        }
    
        let day = startOfWeek;      
        let weeksCount;
        if (options.startDate) {
            const calcWeeksCount = () => {
                let startDate = dayjs(options.startDate); // startDate를 dayjs 객체로 변환
                const calculateWeeksBetween = (startDate, endDate) => endDate.diff(startDate, 'weeks');
                return calculateWeeksBetween(startDate, startOfWeek);
            };
            weeksCount = calcWeeksCount(); // weeksCount 값을 계산하여 할당            
        }
        let totalCount = weeksCount + futureLimit;
        let setDay = startOfWeek.subtract(totalCount, 'week');
        let pastDay = startOfWeek.subtract(weeksCount, 'week');
    
        if (options.userSwiping) {                  
            while (day.isSameOrBefore(endOfWeek)) {
                // 요일 표시
                const weekLabel = document.createElement('li');
                weekLabel.classList.add('label');
                weekLabel.textContent = day.format('ddd'); // 한글 요일 추가
                weeklyLabels.appendChild(weekLabel);
    
                // // 일요일(0)과 토요일(6) 체크하여 'holiday' 클래스 추가
                if (day.day() === 0 || day.day() === 6) {
                    weekLabel.classList.add('holiday');                    
                }
    
                // // 오늘의 날짜에 'today' 클래스 추가
                if (day.isSame(dayjs(), 'day')) {                    
                    weekLabel.classList.add('today');
                }
    
                day = day.add(1, 'day');
            }
            while (setDay.isSameOrBefore(endLimitDay.subtract(1, 'week'))) {
                // 한 주의 데이터를 담을 slideItem 생성
                const slideItem = document.createElement('div');
                slideItem.classList.add('swiper-slide');
                swipingContainer.appendChild(slideItem);
        
                // 한 주의 날짜 리스트를 담을 dayListUl 생성
                const dayListUl = document.createElement('ul');
                slideItem.appendChild(dayListUl);

                // 한 주의 요일 및 날짜 생성
                for (let i = 0; i < 7; i++) {    
                    // 날짜를 담을 li 생성
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = '#none';
        
                    // 날짜 표시
                    const dayDiv = document.createElement('div');
                    dayDiv.classList.add('day');
                    dayDiv.textContent = setDay.format('DD'); // 날짜 표시
        
                    // link 안에 dayDiv 추가
                    link.appendChild(dayDiv);
                    listItem.appendChild(link);
                    dayListUl.appendChild(listItem);
        
                    // 일요일(0)과 토요일(6) 체크하여 'holiday' 클래스 추가
                    if (setDay.day() === 0 || setDay.day() === 6) {                        
                        dayDiv.classList.add('holiday');
                    }
        
                    // 오늘의 날짜에 'today' 클래스 추가
                    if (setDay.day() === dayjs().day()) {                    
                        dayDiv.classList.add('today');
                    }
    
                    // 사용자 데이터 추가
                    if (typeof options.addUserDataToWeeklyLink === 'function') {
                        if(setDay.isSameOrBefore(dayjs())) { //오늘까지 데이터 노출
                            options.addUserDataToWeeklyLink(link);
                        }
                    }     
    
                    // 클릭 이벤트 리스너 추가
                    (function (currentDay) {
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (typeof options.handleWeeklyLinkClick === 'function') {
                                options.handleWeeklyLinkClick(currentDay); // 전달된 클릭 함수 사용
                                console.log(currentDay)
                            }
                        });
                    })(setDay);                 
                    
                    // 다음 날짜로 이동
                    setDay = setDay.add(1, 'day');
                }
            }
    
            // 오늘 날짜 출력
            const todayDate = dayjs().format('YYYY-MM-DD');
            const displayContentSection = document.querySelector(options.sectionName);
            if (options.deTailView !== false && options.deTailView !== '' && displayContentSection) {
                // displayContentSection.innerText = todayDate;
                displayContentSection.setAttribute('data-time', todayDate)
            }   
        } else {
            while (day.isSameOrBefore(endOfWeek)) {
                // 요일 표시
                const weekLabel = document.createElement('li');
                weekLabel.classList.add('label');
                weekLabel.textContent = day.format('ddd'); // 한글 요일 추가
                weeklyLabels.appendChild(weekLabel);
        
                // 날짜 표시
                const listItem = document.createElement('li');
                const link = document.createElement('a');
        
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.textContent = `${day.date()}`;
        
                // 일요일(0)과 토요일(6) 체크하여 'holiday' 클래스 추가
                if (day.day() === 0 || day.day() === 6) {
                    link.classList.add('holiday');
                    weekLabel.classList.add('holiday');
                }
        
                link.href = '#none';
                link.appendChild(dayDiv); // 날짜 추가
                listItem.appendChild(link);
                weekDatesList.appendChild(listItem);
        
                // 오늘의 요일에 해당하는 날짜에 'today' 클래스 추가
                if (day.day() === dayjs().day()) {
                    link.classList.add('today');
                    weekLabel.classList.add('today');
                }

                if (typeof options.addUserDataToWeeklyLink === 'function') {
                    if(day.isSameOrBefore(dayjs())) { // 오늘까지 데이터 노출
                        options.addUserDataToWeeklyLink(link);
                    }
                }

                // 클릭 이벤트 리스너 추가
                (function (currentDay) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (typeof options.handleWeeklyLinkClick === 'function') {
                            options.handleWeeklyLinkClick(currentDay); // 전달된 클릭 함수 사용
                        }
                    });
                })(day);
        
                day = day.add(1, 'day');
            }
        } 
        return weeksCount;                       
    }
    
};