const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let mainWindow;

app.on("web-contents-created", (_, contents) => {
  contents.setWindowOpenHandler(() => ({ action: "deny" })); // منع فتح نوافذ جديدة غير مصرح بها
});

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800, // الحجم الأقصى للعرض
    minHeight: 600, // الحجم الأقصى للارتفاع
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    title: 'My Custom Title',
    titleBarStyle: 'hidden', // إخفاء العنوان الافتراضي مع الحفاظ على الإطار
    webPreferences: {
      sandbox: true, // تفعيل وضع الحماية
      preload: __dirname + "/preload.js",
      contextIsolation: true, // تمكين عزل السياق
      nodeIntegration: false, // تعطيل Node.js في Renderer Process
    },
    hasShadow: true
  });


  mainWindow.webContents.once('dom-load', () => {
  });

  mainWindow.loadURL('https://192.168.1.100:443/login');

  mainWindow.setMenu(null);
  mainWindow.webContents.openDevTools({ mode: 'detach' });


  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.webContents.send("show-title-bar", true);
  });

  app.on("window-all-closed", () => {
    app.quit();
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.webContents.executeJavaScript(`

      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'hidden';
  
  
            // إنشاء شريط عنوان مخصص
      const titlebar = document.createElement('div');
      titlebar.style.position = 'relative';
      titlebar.style.width = '100%';
      titlebar.style.height = '31px';
      titlebar.style.backgroundColor = 'transparent';
      titlebar.style.color = 'white';  
      const controls = document.createElement('div');
      controls.style.position = 'relative';
      controls.style.alignItems = 'center';
      controls.style.display = 'flex';
            controls.style.webkitAppRegion = 'no-drag';


      const border = document.createElement('div');
      border.style.position = 'relative';
      border.style.width = '100%';
      border.style.height = '1px';
      border.style.backgroundColor = 'rgba(0,9,20,.1)';

            const logo = document.createElement('div');
      logo.innerHTML = \`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect className="fill-transparent stroke-transparent" width="24" height="24" />
                            
                            <g>
                                <g>
                                    <path stroke="rgba(1, 0, 2)" stroke-width="2" d="M8.54,19.23l0.31,0l7.67-0.03c1.84-0.2,3.61-1.09,4.87-2.64c2.51-3.1,2.03-7.65-1.07-10.16
			c-1.34-1.08-2.95-1.61-4.55-1.61l-0.31,0l-0.31,0L7.48,4.81C5.63,5,3.87,5.9,2.61,7.45c-2.51,3.1-2.03,7.65,1.07,10.16
			c1.34,1.08,2.95,1.61,4.55,1.61L8.54,19.23z"/>
                                </g>
                                <path stroke="rgba(1, 0, 2)" stroke-width="2" d="M15.46,4.77c-2.1,0-4.19,0.92-5.62,2.68C8.58,9,8.07,10.92,8.27,12.76" />
                                <path stroke="rgba(1, 0, 2)" stroke-width="2" d="M8.54,19.23c2.1,0,4.19-0.92,5.62-2.68c1.26-1.55,1.77-3.47,1.57-5.31" />
                            </g>
        </svg>
      \`;
      logo.style.minWidth = '64px';
      logo.style.display = 'flex';
      logo.style.justifyContent = 'center';
      logo.style.alignItems = 'center';
      logo.style.height = '30px';
      
      const drag = document.createElement('div');
      drag.style.position = 'relative';
      drag.style.width = '100%';
      drag.style.height = '31px';
      drag.style.webkitAppRegion = 'drag';


      // زر التصغير
      const minBtn = document.createElement('button');
      minBtn.innerHTML = \`
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g class="icon" stroke="rgba(1, 0, 2, .7)" stroke-width="2" stroke-linecap="round">
              <line x1="7" y1="17" x2="17" y2="17" />
            </g>
        </svg>
      \`;
      minBtn.style.width = '38px';
      minBtn.style.height = '30px';
      minBtn.style.background = 'none';
      minBtn.style.border = 'none';
      minBtn.classList.add('hover-effect');
      minBtn.addEventListener('click', () => {
        window.electron.minimizeWindow();
      });
  
      // زر التكبير
      const maxBtn = document.createElement('button');
      maxBtn.innerHTML = \`
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g class="icon" stroke="rgba(1, 0, 2, .7)" stroke-width="2" stroke-linecap="round">
                <polyline points="12.01,7 17,7 17,11.99 " />
                <polyline points="11.99,17 7,17 7,12.01 " />
            </g>
        </svg>
      \`;
      maxBtn.style.width = '38px';
      maxBtn.style.height = '30px';
      maxBtn.style.background = 'none';
      maxBtn.style.border = 'none';
      maxBtn.classList.add('hover-effect');
      maxBtn.addEventListener('click', () => {
        window.electron.maximizeWindow();
      });
  
      // زر الإغلاق
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = \`
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g class="icon" stroke="rgba(1, 0, 2, .7)" stroke-width="2" stroke-linecap="round">
                <polyline points="17,17 12,12 17,7 " />
                <polyline points="7,7 12,12 7,17 " />
            </g>
        </svg>
      \`;
      closeBtn.style.width = '38px';
      closeBtn.style.height = '30px';
      closeBtn.style.background = 'none';
      closeBtn.style.border = 'none';
        closeBtn.classList.add('hover-effect'); // إضافة class


        const style = document.createElement('style');
  style.textContent = \`

  .hover-effect {
  display:flex;
  justify-content: center;
  align-items: center;
  }
  ::selection {
  background: rgba(10, 116, 255, .2);
  }

  .hover-fill {
  display: flex;
  align-items: center;
  justify-content: center;
  }

  .hover-effect:hover .icon {
    transition: all .15s;
    stroke: rgba(1, 0, 2);
  }
  \`;
  document.head.appendChild(style);

      closeBtn.addEventListener('click', () => {
        window.electron.closeWindow();
      });
  
      
      // إضافة الأزرار إلى عنصر التحكم
      controls.appendChild(logo);
      controls.appendChild(drag);
      controls.appendChild(minBtn);
      controls.appendChild(maxBtn);
      controls.appendChild(closeBtn);

      titlebar.appendChild(controls);

  
      // إضافة الشريط إلى بداية body
      document.body.insertBefore(titlebar, document.body.firstChild);

  
      // تعديل محتوى الصفحة ليتناسب مع الشريط
      document.body.style.marginTop = '0';
    `);
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

ipcMain.on("toggle-title-bar", (_, show) => {
  console.log(show);
  mainWindow.hide();
});

ipcMain.on('window-minimize', () => mainWindow.minimize());
ipcMain.on('window-maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  } else {
    mainWindow.maximize();
  }
});
ipcMain.on('window-close', () => mainWindow.close());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
