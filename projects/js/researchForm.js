        // JavaScript for interactivity
        
        // Saved data storage (using JavaScript variables since localStorage isn't supported)
        let savedData = {
            visitCount: 0,
            lastSaved: null,
            bookmarkedPapers: [],
            completedSections: []
        };

        // Toggle collapsible problem statements
        function toggleProblem(header) {
            const problemItem = header.parentElement;
            const isActive = problemItem.classList.contains('active');
            
            // Close all other problems
            document.querySelectorAll('.problem-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current problem
            if (!isActive) {
                problemItem.classList.add('active');
                
                // Track completed sections
                const problemTitle = header.querySelector('h3').textContent;
                if (!savedData.completedSections.includes(problemTitle)) {
                    savedData.completedSections.push(problemTitle);
                }
            }
        }

        // Save progress functionality
        function saveProgress() {
            savedData.visitCount++;
            savedData.lastSaved = new Date().toISOString();
            
            // Save innovation progress
            saveInnovationProgress();
            
            // Show notification
            const notification = document.getElementById('saveNotification');
            notification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
            
            console.log('All progress saved:', savedData);
        }

        // Open registration form (Comprehensive Form)
        function openRegistration() {
            const modal = document.getElementById('registrationModal');
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Save application attempt
            savedData.applicationStarted = new Date().toISOString();
            savedData.registrationPlatform = 'Internal Form';
            console.log('Registration form opened:', savedData);
        }

        // Close registration form
        function closeRegistration() {
            const modal = document.getElementById('registrationModal');
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }

        // Handle form submission
        function handleFormSubmission(event) {
            event.preventDefault();
            
            // Validate form before submission
            if (!validateForm()) {
                return;
            }
            
            const formData = new FormData(event.target);
            const applicationData = {
                personal: {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    country: formData.get('country'),
                    city: formData.get('city')
                },
                academic: {
                    university: formData.get('university'),
                    degree: formData.get('degree'),
                    major: formData.get('major'),
                    gpa: formData.get('gpa'),
                    graduationDate: formData.get('graduationDate')
                },
                research: {
                    areas: formData.getAll('researchAreas'),
                    experience: formData.get('researchExperience')
                },
                technical: {
                    programming: formData.getAll('programmingSkills'),
                    frameworks: formData.getAll('mlFrameworks'),
                    otherSkills: formData.get('otherSkills')
                },
                preferences: {
                    duration: formData.get('duration'),
                    startDate: formData.get('startDate'),
                    motivation: formData.get('motivation'),
                    contribution: formData.get('contribution')
                },
                documents: {
                    portfolio: formData.get('portfolio'),
                    newsletter: formData.get('newsletter') === 'on'
                },
                submissionDate: new Date().toISOString()
            };
            
            // Save application data
            savedData.applicationData = applicationData;
            savedData.applicationSubmitted = true;
            
            // Show success message
            const notification = document.getElementById('saveNotification');
            notification.innerHTML = '🎉 Application submitted successfully! We\'ll contact you soon.';
            notification.style.background = '#48bb78';
            notification.classList.add('show');
            
            // Close form
            closeRegistration();
            
            // Reset form
            document.getElementById('internshipForm').reset();
            
            // Hide notification after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.innerHTML = '✅ Research progress saved successfully!';
                    notification.style.background = '#48bb78';
                }, 300);
            }, 5000);
            
            console.log('Application submitted:', applicationData);
            
            // Show detailed confirmation
            setTimeout(() => {
                alert(
                    'Application Submitted Successfully! 🎉\n\n' +
                    `Dear ${applicationData.personal.firstName},\n\n` +
                    'Thank you for your interest in joining our AI Research Institute!\n\n' +
                    'Next Steps:\n' +
                    '• You will receive a confirmation email within 24 hours\n' +
                    '• Our team will review your application within 5-7 business days\n' +
                    '• Qualified candidates will be contacted for interviews\n' +
                    '• We will notify all applicants of the final decision\n\n' +
                    'Questions? Contact us at research@aiinstitute.org'
                );
            }, 1000);
        }

        // Form validation helpers
        function validateForm() {
            const requiredFields = ['firstName', 'lastName', 'email', 'country', 'city', 'university', 'degree', 'major', 'duration', 'motivation', 'contribution'];
            const researchAreas = document.querySelectorAll('input[name="researchAreas"]:checked');
            const programmingSkills = document.querySelectorAll('input[name="programmingSkills"]:checked');
            const agreement = document.getElementById('agreement');
            
            // Check required fields
            for (const field of requiredFields) {
                const element = document.getElementById(field);
                if (!element.value.trim()) {
                    element.focus();
                    alert(`Please fill in the ${element.previousElementSibling.textContent.replace(' *', '')} field.`);
                    return false;
                }
            }
            
            // Check research areas
            if (researchAreas.length === 0) {
                alert('Please select at least one research area of interest.');
                return false;
            }
            
            // Check programming skills
            if (programmingSkills.length === 0) {
                alert('Please select at least one programming language.');
                return false;
            }
            
            // Check agreement
            if (!agreement.checked) {
                alert('Please agree to the terms and conditions.');
                return false;
            }
            
            return true;
        }

        // File upload handlers
        function setupFileUploads() {
            const fileInputs = document.querySelectorAll('input[type="file"]');
            
            fileInputs.forEach(input => {
                const uploadDiv = input.parentElement;
                const textSpan = uploadDiv.querySelector('.file-upload-text');
                
                input.addEventListener('change', function() {
                    const files = this.files;
                    if (files.length > 0) {
                        if (files.length === 1) {
                            textSpan.textContent = files[0].name;
                        } else {
                            textSpan.textContent = `${files.length} files selected`;
                        }
                        uploadDiv.style.borderColor = '#48bb78';
                        uploadDiv.style.background = '#f0fff4';
                    } else {
                        textSpan.textContent = 'Choose file or drag here';
                        uploadDiv.style.borderColor = '#cbd5e0';
                        uploadDiv.style.background = '#f8fafc';
                    }
                });
            });
        }

        // Bookmark paper functionality
        function bookmarkPaper(paperTitle, paperUrl) {
            const bookmark = {
                title: paperTitle,
                url: paperUrl,
                timestamp: new Date().toISOString()
            };
            
            if (!savedData.bookmarkedPapers.find(p => p.url === paperUrl)) {
                savedData.bookmarkedPapers.push(bookmark);
                console.log('Paper bookmarked:', bookmark);
            }
        }

        // Add bookmark buttons to papers
        document.addEventListener('DOMContentLoaded', function() {
            const paperCards = document.querySelectorAll('.paper-card');
            
            paperCards.forEach(card => {
                const paperBody = card.querySelector('.paper-body');
                const paperTitle = card.querySelector('.paper-title').textContent;
                const paperLink = card.querySelector('.paper-link').href;
                
                const bookmarkBtn = document.createElement('button');
                bookmarkBtn.textContent = '🔖 Bookmark';
                bookmarkBtn.style.cssText = `
                    background: #48bb78;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 8px;
                    margin-left: 10px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: background 0.3s ease;
                `;
                bookmarkBtn.onmouseover = () => bookmarkBtn.style.background = '#38a169';
                bookmarkBtn.onmouseout = () => bookmarkBtn.style.background = '#48bb78';
                bookmarkBtn.onclick = () => {
                    bookmarkPaper(paperTitle, paperLink);
                    bookmarkBtn.textContent = '✅ Bookmarked';
                    bookmarkBtn.style.background = '#38a169';
                };
                
                paperBody.appendChild(bookmarkBtn);
            });
            
            // Initialize visit count
            savedData.visitCount++;
            console.log('Page loaded. Visit count:', savedData.visitCount);
        });

        // Auto-save on page unload
        window.addEventListener('beforeunload', function() {
            saveProgress();
        });