function createCodeRain() {
    const codeRain = document.querySelector('.code-rain');
    const codeSnippets = 0;

    let codeText = '';

    for (let i = 0; i < 50; i++) {
        const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        codeText += randomSnippet + '\n';
    }
    
    codeRain.textContent = codeText;
}


function typeCode() {
    const codeElement = document.getElementById('typing-code');

    const codeToType = `
class AppError extends Error {
  constructor(message, code = 500) {
    super(message);

    this.code = code;
  }
}

const errorHandler = (err, req, res, next) => {
  res.status(err.code || 500).json({ error: err.message });
};

class UserService {
  async findByEmail(email) {
    const user = await db.users.findOne({ email });

    if (!user) throw new AppError("Ошибка", 404);

    return user;
  }
}

const userService = new UserService();

app.get("/profile", async (req, res, next) => {
  try {
    const user = await userService.findByEmail(req.query.email);

    res.json({ id: user.id, email: user.email });
    
  } catch (e) {
    next(e);
  }
}
  );

app.use(errorHandler);`;

    let i = 0;
    const speed = 50;

    function typeWriter() {
        if (i < codeToType.length) {
            codeElement.textContent += codeToType.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(() => {
                codeElement.textContent = '';
                i = 0;
                typeWriter();
            }, 3000);
        }
    }

    typeWriter();
}


function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');


    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    });


    window.addEventListener('scroll', () => {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        }
    );

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        }
    );
    }
);

}


function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                skillBar.style.width = level + '%';
            }
        }
    );

    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}



function setupGlowEffects() {
    const glowElements = document.querySelectorAll('.skill-category, .floating-card');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
        }
    );
    }
);
}


function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        observer.observe(element);
    }
);
}


document.addEventListener('DOMContentLoaded', () => {
    createCodeRain();
    typeCode();
    setupNavigation();
    animateSkillBars();
    setupGlowEffects();
    setupScrollAnimations();
}
);


setInterval(createCodeRain, 10000);