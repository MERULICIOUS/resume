// Mobile Menu Toggle
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const navigationItems = document.querySelectorAll(".navigation a");
const scrollTopBtn = document.querySelector(".scrollToTop-btn"); 

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");
});

// Sticky Header & Back-to-Top Visibility on Scroll
window.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
    
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

// Smooth Scroll To Top Logic
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Close Mobile Menu When Link is Clicked
navigationItems.forEach((navigationItem) => {
    navigationItem.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navigation.classList.remove("active");
    });
});

// Video Scroll & Navigation Observer Logic
const resumeVideo = document.querySelector(".home-video video");
if (resumeVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                resumeVideo.pause();
            } else {
                resumeVideo.play().catch(error => console.log("Autoplay paused"));
            }
        });
    }, { threshold: 0.25 });

    videoObserver.observe(resumeVideo);

    navigationItems.forEach((link) => {
        link.addEventListener("click", () => {
            resumeVideo.pause();
        });
    });
}

// Database definition storing assets inside your specific folder paths
const folderDatabase = {
    'engineering-folder': {
        title: 'Engineering Projects Data',
        icon: '<i class="fas fa-folder-open" style="color: #e3a324;"></i>',
        media: [
            { type: 'image', src: 'picture/photo5.jpg', caption: 'Lab Team Assembly Session' },
            { type: 'image', src: 'picture/photo2 (1).jpg', caption: 'Circuit Component Analysis' },
            { type: 'image', src: 'picture/photo2 (2).jpg', caption: 'Wiring Alignment Calibration' },
            { type: 'image', src: 'picture/photo4.jpg', caption: 'Industrial Pipe Fabrication Work' },
            { type: 'image', src: 'picture/IMG_20230920_102111.jpg', caption: 'Hacking into the ground Work' },
            { type: 'image', src: 'picture/IMG_20230305_203107.jpg', caption: 'Robotic circuit' },
        ]
    },
    'coding-folder': {
        title: 'Final Year Project Video ',
        icon: '<i class="fas fa-folder-open" style="color: #3a6cf4;"></i>',
        media: [
            { type: 'video', src: 'video/VID_20230518_025635.mp4', caption: 'Project Workflow Demo Video' },
            { type: 'video', src: 'video/VID_20230516_195914 - Trim.mp4', caption: 'Final Project Documentation' }
        ]
    },
    'certifications-folder': {
        title: 'Certificates & Activities Archive',
        icon: '<i class="fas fa-folder-open" style="color: #28a745;"></i>',
        media: [
            { type: 'image', src: 'picture/sijil.jpg', caption: 'Certficate 1' },
            { type: 'image', src: 'picture/sijil2.jpg', caption: 'Certifcicate 2' },
            { type: 'image', src: 'picture/jempol.jpg', caption: 'CSR helping the community' }
        ]
    }
};

// Function Engine to Open Selected Folder Screen Content Layout
function openFolder(folderKey) {
    const folder = folderDatabase[folderKey];
    if (!folder) return;

    document.getElementById('modalFolderIcon').innerHTML = folder.icon;
    document.getElementById('modalFolderTitle').innerText = folder.title;

    const mediaGrid = document.getElementById('modalMediaGrid');
    mediaGrid.innerHTML = ''; 

    folder.media.forEach(item => {
        const itemWrapper = document.createElement('div');
        itemWrapper.style.background = '#1a2236';
        itemWrapper.style.borderRadius = '8px';
        itemWrapper.style.overflow = 'hidden';
        itemWrapper.style.border = '1px solid rgba(255,255,255,0.05)';

        let mediaElement = '';
        if (item.type === 'image') {
            mediaElement = `<img src="${item.src}" alt="${item.caption}" style="width:100%; height:180px; object-fit:cover;">`;
        } else if (item.type === 'video') {
            mediaElement = `<video controls style="width:100%; height:180px; object-fit:cover; background:#000;"><source src="${item.src}" type="video/mp4"></video>`;
        }

        itemWrapper.innerHTML = `
            ${mediaElement}
            <div style="padding: 12px; color: #a4a6b0; font-size: 0.85rem; text-align: center; font-weight: 500;">
                ${item.caption}
            </div>
        `;
        mediaGrid.appendChild(itemWrapper);
    });

    const lightbox = document.getElementById('folderLightbox');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

// Function Engine to Close Content Views
function closeFolder() {
    const lightbox = document.getElementById('folderLightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; 
    
    const videos = lightbox.getElementsByTagName('video');
    for (let i = 0; i < videos.length; i++) {
        videos[i].pause();
    }
}

window.onclick = function(event) {
    const lightbox = document.getElementById('folderLightbox');
    if (event.target == lightbox) {
        closeFolder();
    }
}

// Smoothly reveal the page once everything is fully ready
window.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('loaded');
});