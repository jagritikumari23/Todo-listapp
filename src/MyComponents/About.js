import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">About TaskFlow</h2>
              
              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <div className="feature-card p-3 h-100">
                    <h4 className="mb-3">📝 Task Management</h4>
                    <p>Organize your tasks with categories, due dates, and priority levels. Keep track of your progress with our intuitive interface.</p>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="feature-card p-3 h-100">
                    <h4 className="mb-3">🎯 Stay Focused</h4>
                    <p>Sort and filter tasks by category, search for specific items, and mark completed tasks to maintain productivity.</p>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="feature-card p-3 h-100">
                    <h4 className="mb-3">⏰ Due Date Reminders</h4>
                    <p>Never miss a deadline with our built-in notification system. Get reminders for upcoming tasks.</p>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="feature-card p-3 h-100">
                    <h4 className="mb-3">🌙 Dark Mode</h4>
                    <p>Work comfortably day or night with our customizable theme options.</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <h5>Version 1.0.0</h5>
                <p className="text-muted">Created with ❤️ using React and Firebase</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;