import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Library, ExternalLink, Book, FileText, Globe } from 'lucide-react';

interface LibraryResource {
  id: string;
  name: string;
  type: 'external' | 'pdf' | 'link';
  url: string;
  description: string;
  category: string;
  icon: React.ReactNode;
}

const E_LIBRARY_RESOURCES: LibraryResource[] = [
  {
    id: '1',
    name: 'NCERT Digital Library',
    type: 'external',
    url: 'https://ncert.nic.in/',
    description: 'Official NCERT books and study materials for all classes',
    category: 'Textbooks',
    icon: <Book size={24} />,
  },
  {
    id: '2',
    name: 'Khan Academy',
    type: 'external',
    url: 'https://www.khanacademy.org/',
    description: 'Free online courses and learning videos for all subjects',
    category: 'Video Tutorials',
    icon: <FileText size={24} />,
  },
  {
    id: '3',
    name: 'Google Scholar',
    type: 'external',
    url: 'https://scholar.google.com/',
    description: 'Search scholarly articles, thesis, and academic papers',
    category: 'Research Papers',
    icon: <FileText size={24} />,
  },
  {
    id: '4',
    name: 'Project Gutenberg',
    type: 'external',
    url: 'https://www.gutenberg.org/',
    description: 'Over 70,000 free eBooks in HTML, Kindle, EPUB formats',
    category: 'eBooks',
    icon: <Book size={24} />,
  },
  {
    id: '5',
    name: 'OpenStax',
    type: 'external',
    url: 'https://openstax.org/',
    description: 'Free peer-reviewed textbooks for high school and college',
    category: 'Textbooks',
    icon: <Book size={24} />,
  },
  {
    id: '6',
    name: 'Coursera',
    type: 'external',
    url: 'https://www.coursera.org/',
    description: 'Online courses from top universities and companies',
    category: 'Online Courses',
    icon: <FileText size={24} />,
  },
  {
    id: '7',
    name: 'British Council - Learn English',
    type: 'external',
    url: 'https://learnenglish.britishcouncil.org/',
    description: 'Free English learning resources, games, and activities',
    category: 'Language Learning',
    icon: <FileText size={24} />,
  },
  {
    id: '8',
    name: 'Math is Fun',
    type: 'external',
    url: 'https://www.mathsisfun.com/',
    description: 'Interactive math lessons and games for all levels',
    category: 'Mathematics',
    icon: <FileText size={24} />,
  },
  {
    id: '9',
    name: 'Wikipedia',
    type: 'external',
    url: 'https://www.wikipedia.org/',
    description: 'Free online encyclopedia with millions of articles',
    category: 'Reference',
    icon: <Globe size={24} />,
  },
  {
    id: '10',
    name: 'MIT OpenCourseWare',
    type: 'external',
    url: 'https://ocw.mit.edu/',
    description: 'Free MIT courses and materials for learners worldwide',
    category: 'University Courses',
    icon: <Book size={24} />,
  },
  {
    id: '11',
    name: 'National Geographic Kids',
    type: 'external',
    url: 'https://kids.nationalgeographic.com/',
    description: 'Educational articles, games, and videos about nature and science',
    category: 'Science',
    icon: <FileText size={24} />,
  },
  {
    id: '12',
    name: 'TED-Ed',
    type: 'external',
    url: 'https://www.ted.com/edtalks',
    description: 'Animated educational videos on science, history, and more',
    category: 'Video Tutorials',
    icon: <FileText size={24} />,
  },
];

export const ELibraryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', ...new Set(E_LIBRARY_RESOURCES.map(r => r.category))];

  const filteredResources = E_LIBRARY_RESOURCES.filter(resource => {
    const matchCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleAccessLibrary = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <PageWrapper title="E-Library">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Library size={32} className="text-purple-600" />
                Digital E-Library
              </h1>
              <p className="text-slate-600 mt-2">Access external educational resources and learning materials</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="p-4">
          <input
            type="text"
            placeholder="Search libraries, resources, or materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </Card>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Total Resources</p>
            <p className="text-3xl font-bold text-purple-600">{E_LIBRARY_RESOURCES.length}</p>
            <p className="text-xs text-slate-500 mt-2">Available Libraries</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Categories</p>
            <p className="text-3xl font-bold text-blue-600">{categories.length - 1}</p>
            <p className="text-xs text-slate-500 mt-2">Resource Types</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Filtered</p>
            <p className="text-3xl font-bold text-green-600">{filteredResources.length}</p>
            <p className="text-xs text-slate-500 mt-2">Showing Results</p>
          </Card>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map(resource => (
            <Card key={resource.id} className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-purple-600">{resource.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{resource.name}</h3>
                    <Badge className="bg-purple-100 text-purple-800 text-xs mt-1">
                      {resource.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

              <button
                onClick={() => handleAccessLibrary(resource.url)}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                Access Library
              </button>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-purple-50 border-2 border-dashed border-gray-300">
            <Library size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Resources Found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </Card>
        )}

        {/* Info Box */}
        <Card className="bg-blue-50 border border-blue-200 p-4">
          <div className="flex gap-3">
            <Globe className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-blue-900">External Resources</p>
              <p className="text-sm text-blue-700 mt-1">
                All resources are external websites. Click "Access Library" to open them in a new tab. These are free educational platforms and repositories maintained by educational institutions and organizations worldwide.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
