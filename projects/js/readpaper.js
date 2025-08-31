// =======================
// All Paper Data
// =======================
const papers = [
  {
    id: 1,
    title: "Large Language Model Prediction Capabilities: Evidence from Real-World Forecasting",
    authors: "Philipp Schoenegger, Peter S. Park",
    abstract: "Text-to-image generation advancements have been predominantly English-centric, creating barriers for non-English speakers and perpetuating digital inequities. While existing systems rely on translation pipelines, these introduce semantic drift, computational overhead, and cultural misalignment. We introduce NeoBabel, a novel multilingual image generation framework that sets a new Pareto frontier in performance, efficiency and inclusivity, supporting six languages: English, Chinese, Dutch, French, Hindi, and Persian. The model is trained using a combination of large-scale multilingual pretraining and high-resolution instruction tuning. To evaluate its capabilities, we expand two English-only benchmarks to multilingual equivalents: m-GenEval and m-DPG. NeoBabel achieves state-of-the-art multilingual performance while retaining strong English capability, scoring 0.75 on m-GenEval and 0.68 on m-DPG. Notably, it performs on par with leading models on English tasks while outperforming them by +0.11 and +0.09 on multilingual benchmarks, even though these models are built on multilingual base LLMs. This demonstrates the effectiveness of our targeted alignment training for preserving and extending crosslingual generalization. We further introduce two new metrics to rigorously assess multilingual alignment and robustness to code-mixed prompts. Notably, NeoBabel matches or exceeds English-only models while being 2-4x smaller. We release an open toolkit, including all code, model checkpoints, a curated dataset of 124M multilingual text-image pairs, and standardized multilingual evaluation protocols, to advance inclusive AI research. Our work demonstrates that multilingual capability is not a trade-off but a catalyst for improved robustness, efficiency, and cultural fidelity in generative AI."
  },
  {
    id: 2,
    title: "Comprehensive Survey of Mixture-of-Experts: Algorithms, Theory, and Applications",
    authors: "Siyuan Mu, Sen Lin",
    abstract: "Recent advancements in large language models (LLMs) have shifted focus toward scaling inference-time compute, improving performance without retraining the model. A common approach is to sample multiple outputs in parallel, and select one of these as the final output. However, work to date has focused on English and a handful of domains such as math and code. In contrast, we are most interested in techniques that generalize across open-ended tasks, formally verifiable tasks, and across languages. In this work, we study how to robustly scale inference-time compute for open-ended generative tasks in a multilingual, multi-task setting. Our findings show that both sampling strategy -based on temperature variation- and selection strategy must be adapted to account for diverse domains and varied language settings. We evaluate existing selection methods, revealing that strategies effective in English often fail to generalize across languages. We propose novel sampling and selection strategies specifically adapted for multilingual and multi-task inference scenarios, and show they yield notable gains across languages and tasks. In particular, our combined sampling and selection methods lead to an average +6.8 jump in win-rates for our 8B models on m-ArenaHard-v2.0 prompts, against proprietary models such as Gemini. At larger scale, Command-A (111B model) equipped with our methods, shows +9.0 improvement in win-rates on the same benchmark with just five samples against single-sample decoding, a substantial increase at minimal cost. Our results underscore the need for language- and task-aware approaches to inference-time compute, aiming to democratize performance improvements in underrepresented languages.f up to 14.1% on underrepresented tasks like CodeRepair and absolute improvements of 35.3% on length instruction following evaluations."
  },
  {
    id: 3,
    title: "TinyML Design Contest for Life-Threatening Ventricular Arrhythmia Detection",
    authors: "Zhenge Jia, Dawei Li, Cong Liu, et al.",
    abstract: "One of the most profound challenges of modern machine learning is performing well on the long-tail of rare and underrepresented features. Large general-purpose models are trained for many tasks, but work best on high-frequency use cases. After training, it is hard to adapt a model to perform well on specific use cases underrepresented in the training corpus. Relying on prompt engineering or few-shot examples to maximize the output quality on a particular test case can be frustrating, as models can be highly sensitive to small changes, react in unpredicted ways or rely on a fixed system prompt for maintaining performance. In this work, we ask: Can we optimize our training protocols to both improve controllability and performance on underrepresented use cases at inference time? We revisit the divide between training and inference techniques to improve long-tail performance while providing users with a set of control levers the model is trained to be responsive to. We create a detailed taxonomy of data characteristics and task provenance to explicitly control generation attributes and implicitly condition generations at inference time. We fine-tune a base model to infer these markers automatically, which makes them optional at inference time. This principled and flexible approach yields pronounced improvements in performance on examples from the long tail of the training distribution. Overall, we observe lifts of 5.7% across all tasks. However, treasure markers are particularly effective at finding difficult to obtain gains in the long-tail. We observe relative lifts of up to 14.1% on underrepresented tasks like CodeRepair and absolute improvements of 35.3% on length instruction following evaluations."
  },
  {
    id: 4,
    title: "From LLM Reasoning to Autonomous AI Agents: A Comprehensive Review",
    authors: "Mohamed Amine Ferrag, Norbert Tihanyi, Merouane Debbah",
    abstract: "Reward models are used throughout the post-training of language models to capture nuanced signals from preference data and provide a training target for optimization across instruction following, reasoning, safety, and more domains. The community has begun establishing best practices for evaluating reward models, from the development of benchmarks that test capabilities in specific skill areas to others that test agreement with human preferences. At the same time, progress in evaluation has not been mirrored by the effectiveness of reward models in downstream tasks -- simpler direct alignment algorithms are reported to work better in many cases. This paper introduces RewardBench 2, a new multi-skill reward modeling benchmark designed to bring new, challenging data for accuracy-based reward model evaluation -- models score about 20 points on average lower on RewardBench 2 compared to the first RewardBench -- while being highly correlated with downstream performance. Compared to most other benchmarks, RewardBench 2 sources new human prompts instead of existing prompts from downstream evaluations, facilitating more rigorous evaluation practices. In this paper, we describe our benchmark construction process and report how existing models perform on it, while quantifying how performance on the benchmark correlates with downstream use of the models in both inference-time scaling algorithms, like best-of-N sampling, and RLHF training algorithms like proximal policy optimization."
  }

];

// =======================
// Load correct paper
// =======================

// Get the paper id from URL (example: readpaper.html?id=2)
const params = new URLSearchParams(window.location.search);
const paperId = parseInt(params.get("id"));

// Find the paper in array
const paper = papers.find(p => p.id === paperId);

// Update page if found
if (paper) {
  document.getElementById("paperTitle").textContent = paper.title;
  document.getElementById("paperAuthors").textContent = paper.authors;
  document.getElementById("paperAbstract").textContent = paper.abstract;
} else {
  document.getElementById("paperTitle").textContent = "Paper not found";
  document.getElementById("paperAuthors").textContent = "";
  document.getElementById("paperAbstract").textContent = "";
}


// Academic Paper Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page functionality
    initializeButtons();
    initializeAnimations();
    initializeKeyboardNavigation();
});

/**
 * Initialize button event handlers
 */
function initializeButtons() {
    const readPaperBtn = document.getElementById('readPaper');
    const discussPaperBtn = document.getElementById('discussPaper');
    const backLink = document.getElementById('backLink');
    
    // Read Paper button
    if (readPaperBtn) {
        readPaperBtn.addEventListener('click', handleReadPaper);
    }
    
    // Discuss Paper button
    if (discussPaperBtn) {
        discussPaperBtn.addEventListener('click', handleDiscussPaper);
    }
    
    // Back to papers link
    if (backLink) {
        backLink.addEventListener('click', handleBackToPapers);
    }
}

/**
 * Handle Read Paper button click
 */
function handleReadPaper(event) {
    event.preventDefault();
    
    // Add loading state
    const button = event.target.closest('.btn');
    addLoadingState(button);
    
    // Simulate loading delay
    setTimeout(() => {
        removeLoadingState(button);
        
        // Replace this with actual paper URL
        // window.open('path/to/paper.pdf', '_blank');
        
        // For demonstration, show alert
        showNotification('Opening paper...', 'info');
        
        // Example of actual implementation:
        // const paperUrl = 'https://example.com/papers/neobabel.pdf';
        // window.open(paperUrl, '_blank');
    }, 1000);
}

/**
 * Handle Discuss Paper button click
 */
function handleDiscussPaper(event) {
    event.preventDefault();
    
    const button = event.target.closest('.btn');
    addLoadingState(button);
    
    setTimeout(() => {
        removeLoadingState(button);
        
        // Replace this with actual discussion URL
        // window.location.href = '/papers/neobabel/discussion';
        
        showNotification('Opening discussion forum...', 'info');
        
        // Example of actual implementation:
        // const discussionUrl = '/papers/neobabel/discussion';
        // window.location.href = discussionUrl;
    }, 800);
}

/**
 * Handle Back to Papers link click
 */
function handleBackToPapers(event) {
    event.preventDefault();
    
    // Add smooth transition effect
    document.body.style.opacity = '0.8';
    
    setTimeout(() => {
        // Replace this with actual papers listing URL
        // window.location.href = '/papers';
        
        showNotification('Returning to papers list...', 'info');
        document.body.style.opacity = '1';
        
        // Example of actual implementation:
        // window.location.href = '/papers';
    }, 300);
}

/**
 * Add loading state to button
 */
function addLoadingState(button) {
    if (!button) return;
    
    button.disabled = true;
    button.style.opacity = '0.7';
    
    const originalText = button.textContent;
    button.setAttribute('data-original-text', originalText);
    
    // Add loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '⏳';
    spinner.style.display = 'inline-block';
    spinner.style.marginRight = '8px';
    
    button.insertBefore(spinner, button.firstChild);
}

/**
 * Remove loading state from button
 */
function removeLoadingState(button) {
    if (!button) return;
    
    button.disabled = false;
    button.style.opacity = '1';
    
    const spinner = button.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

/**
 * Initialize page animations
 */
function initializeAnimations() {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe content elements
    const contentElements = document.querySelectorAll('.detail-row');
    contentElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Initialize keyboard navigation
 */
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Escape key to go back
        if (event.key === 'Escape') {
            const backLink = document.getElementById('backLink');
            if (backLink) {
                backLink.click();
            }
        }
        
        // Enter key on focused buttons
        if (event.key === 'Enter' && event.target.classList.contains('btn')) {
            event.target.click();
        }
    });
}

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        backgroundColor: type === 'info' ? '#3b82f6' : '#ef4444',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateX(100px)',
        transition: 'all 0.3s ease',
        fontSize: '14px',
        fontWeight: '500'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Utility function to debounce events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handle window resize events
 */
window.addEventListener('resize', debounce(() => {
    // Adjust layout if needed on resize
    console.log('Window resized');
}, 250));

/**
 * Handle page visibility change
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

/**
 * Error handling for buttons
 */
window.addEventListener('error', (event) => {
    console.error('Page error:', event.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleReadPaper,
        handleDiscussPaper,
        handleBackToPapers,
        showNotification
    };
}
document.getElementById("discussPaper").addEventListener("click", () => {
    window.location.href = "contact.html";
  });
    document.getElementById("backLink").addEventListener("click", function (e) {
    e.preventDefault();         // stop normal link behavior
    window.history.back();      // go back to previous page
  });