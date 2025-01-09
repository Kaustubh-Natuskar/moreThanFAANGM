document.addEventListener('DOMContentLoaded', function () {
  // Collect all unique tags
  const companies = document.querySelectorAll('.company-item');
  const tags = new Set();

  companies.forEach(company => {
    const companyTags = company.dataset.tags?.split(',') || [];
    companyTags.forEach(tag => tags.add(tag.trim().toLowerCase()));
  });

  // Create filter buttons
  const filterContainer = document.getElementById('tag-filters');
  const sortedTags = Array.from(tags).sort();
  sortedTags.forEach(tag => {
    if (!tag) return;
    const button = document.createElement('button');
    button.className = 'tag-filter';
    button.textContent = tag;
    button.addEventListener('click', () => toggleFilter(button, tag));
    filterContainer.appendChild(button);
  });

  const activeFilters = new Set();

  function toggleFilter(button, tag) {
    button.classList.toggle('active');

    if (activeFilters.has(tag)) {
      activeFilters.delete(tag);
    } else {
      activeFilters.add(tag);
    }

    filterCompanies();
  }

  function filterCompanies() {
    const sections = document.querySelectorAll('.section-container');

    sections.forEach(section => {
      const companies = section.querySelectorAll('.company-item');
      let visibleCount = 0;

      // First, handle company visibility
      companies.forEach(company => {
        const companyTags = (company.dataset.tags?.split(',') || [])
          .map(tag => tag.trim().toLowerCase());

        const isVisible = activeFilters.size === 0 ||
          [...activeFilters].some(filter => companyTags.includes(filter));

        if (isVisible) {
          company.classList.remove('hidden');
          visibleCount++;
        } else {
          company.classList.add('hidden');
        }
      });

      // Then, handle section visibility
      if (visibleCount === 0) {
        section.classList.add('hidden');
      } else {
        section.classList.remove('hidden');
      }
    });
  }
}); 
