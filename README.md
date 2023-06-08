# README MAIN (MON, JULY 12th, 2022)

## 1.Cách tổ chức file:

**a) Folder assets:** chứa _hình ảnh, font chữ, color_; khi merge nhớ chuyển folder `constant`, `image`,... vào trong folder này.  
**b) Folder themes:** chứa các style sheet CSS dùng chung cho dự án.  
**c) Folder components:** chứa các component dùng chung (hoặc các _component con, custom component_ được sử dụng trong các screen).  
**d) Folder screens:** chứa code của từng screen.  
**e) Folder navigators:** chứa code xử lý sự kiện chuyển màn hình và định nghĩa các const cho các route màn hình.  
**f) Folder ios/android:** đây là folder chứa code implement các thành phần mà đặc biệt cho từng hệ điều hành.  
&ensp; Nếu dư thời gian thì quan tâm tới phần này, hiện tại chúng ta chỉ nên chủ động sử dụng các `props` chung (tức là active trên cả 2 hệ điều hành trên, cái này cũng hên xui, có khi không chạy được trên IOS)
