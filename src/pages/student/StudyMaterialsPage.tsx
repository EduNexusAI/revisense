import { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Library, FileText, Play, Download, BookOpen, Search, X, Globe, Users, Calendar, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface ELibraryBook {
  id: string;
  title: string;
  author: string;
  category: 'textbook' | 'journal' | 'research' | 'reference';
  subject: string;
  isbn: string;
  publisher: string;
  year: number;
  pages: number;
  accessType: 'full' | 'preview' | 'limited';
  url: string;
}

export const StudyMaterialsPage = () => {
  const [activeTab, setActiveTab] = useState<'materials' | 'elibrary'>('materials');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'textbook' | 'journal' | 'research' | 'reference'>('all');
  const [viewingBook, setViewingBook] = useState<ELibraryBook | null>(null);
  const materials = [
    {
      id: 1,
      title: 'Algebra Fundamentals',
      subject: 'Mathematics',
      type: 'Notes',
      file: 'algebra-notes.pdf',
      size: '2.4 MB',
      uploadedDate: 'May 10, 2024',
    },
    {
      id: 2,
      title: 'Photosynthesis Process',
      subject: 'Science',
      type: 'Video',
      file: 'photosynthesis-video.mp4',
      size: '156 MB',
      uploadedDate: 'May 8, 2024',
    },
    {
      id: 3,
      title: 'World War II Summary',
      subject: 'History',
      type: 'Notes',
      file: 'wwii-summary.pdf',
      size: '1.8 MB',
      uploadedDate: 'May 5, 2024',
    },
    {
      id: 4,
      title: 'Python Programming Guide',
      subject: 'Computer Science',
      type: 'Video',
      file: 'python-guide.mp4',
      size: '234 MB',
      uploadedDate: 'May 1, 2024',
    },
    {
      id: 5,
      title: 'English Grammar Rules',
      subject: 'English',
      type: 'Notes',
      file: 'english-grammar.pdf',
      size: '3.2 MB',
      uploadedDate: 'April 28, 2024',
    },
    {
      id: 6,
      title: 'Physics Experiments Lab',
      subject: 'Science',
      type: 'Document',
      file: 'physics-lab.pdf',
      size: '5.1 MB',
      uploadedDate: 'April 25, 2024',
    },
  ];

  const elibrary: ELibraryBook[] = [
    {
      id: 'ebook1',
      title: 'Advanced Algebra & Trigonometry',
      author: 'David C. Lay',
      category: 'textbook',
      subject: 'Mathematics',
      isbn: '978-0132413442',
      publisher: 'Pearson Education',
      year: 2023,
      pages: 1024,
      accessType: 'full',
      url: 'https://elibrary.edu/algebra',
    },
    {
      id: 'ebook2',
      title: 'Journal of Modern Biology',
      author: 'Nature Publishing',
      category: 'journal',
      subject: 'Science',
      isbn: '1234-5678',
      publisher: 'Nature Publishing Group',
      year: 2024,
      pages: 156,
      accessType: 'preview',
      url: 'https://elibrary.edu/biology-journal',
    },
    {
      id: 'ebook3',
      title: 'Quantum Computing: Recent Advances',
      author: 'Isaac Chuang, Michael Nielsen',
      category: 'research',
      subject: 'Computer Science',
      isbn: '978-1107002173',
      publisher: 'Cambridge University Press',
      year: 2023,
      pages: 702,
      accessType: 'full',
      url: 'https://elibrary.edu/quantum-computing',
    },
    {
      id: 'ebook4',
      title: 'Oxford Dictionary of English',
      author: 'Oxford University Press',
      category: 'reference',
      subject: 'English',
      isbn: '978-0199660128',
      publisher: 'Oxford University Press',
      year: 2023,
      pages: 2080,
      accessType: 'full',
      url: 'https://elibrary.edu/oxford-dictionary',
    },
    {
      id: 'ebook5',
      title: 'European History 1500-2000',
      author: 'Norman Davies',
      category: 'textbook',
      subject: 'History',
      isbn: '978-0060904242',
      publisher: 'Harper Perennial',
      year: 2023,
      pages: 1368,
      accessType: 'preview',
      url: 'https://elibrary.edu/european-history',
    },
    {
      id: 'ebook6',
      title: 'Physics Research Today',
      author: 'American Physical Society',
      category: 'journal',
      subject: 'Science',
      isbn: '2345-6789',
      publisher: 'APS',
      year: 2024,
      pages: 234,
      accessType: 'limited',
      url: 'https://elibrary.edu/physics-journal',
    },
    {
      id: 'ebook7',
      title: 'Python for Data Science',
      author: 'Jake VanderPlas',
      category: 'textbook',
      subject: 'Computer Science',
      isbn: '978-1491912059',
      publisher: 'O\'Reilly Media',
      year: 2023,
      pages: 540,
      accessType: 'full',
      url: 'https://elibrary.edu/python-datascience',
    },
    {
      id: 'ebook8',
      title: 'Contemporary Chemistry Research',
      author: 'Chemical Society',
      category: 'research',
      subject: 'Science',
      isbn: '3456-7890',
      publisher: 'Chemical Society Publishing',
      year: 2024,
      pages: 189,
      accessType: 'preview',
      url: 'https://elibrary.edu/chemistry-research',
    },
  ];

  const filteredELibrary = elibrary.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'textbook':
        return 'bg-blue-50 border-blue-200';
      case 'journal':
        return 'bg-purple-50 border-purple-200';
      case 'research':
        return 'bg-green-50 border-green-200';
      case 'reference':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'textbook':
        return 'primary';
      case 'journal':
        return 'warning';
      case 'research':
        return 'success';
      case 'reference':
        return 'danger';
      default:
        return 'outline';
    }
  };

  const getAccessBadge = (accessType: string) => {
    switch (accessType) {
      case 'full':
        return { color: 'success', text: 'Full Access' };
      case 'preview':
        return { color: 'warning', text: 'Preview Available' };
      case 'limited':
        return { color: 'danger', text: 'Limited Access' };
      default:
        return { color: 'outline', text: 'Access' };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Play className="w-4 h-4 md:w-5 md:h-5" />;
      case 'Notes':
        return <FileText className="w-4 h-4 md:w-5 md:h-5" />;
      default:
        return <FileText className="w-4 h-4 md:w-5 md:h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Video':
        return 'bg-red-50 border-red-200';
      case 'Notes':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-purple-50 border-purple-200';
    }
  };

  return (
    <PageWrapper title="Study Materials & E-Library" icon={<Library className="w-6 h-6" />}>
      <div className="space-y-4 md:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="border-b border-slate-200/50 pb-3 md:pb-4 lg:pb-6">
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <Library className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-blue-600" />
            <h1 className="text-lg md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Study Materials & E-Library
            </h1>
          </div>
          <p className="text-xs md:text-sm lg:text-base text-slate-600">Access notes, videos, and institute's digital library resources</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap text-sm md:text-base ${
              activeTab === 'materials'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            📚 Study Materials
          </button>
          <button
            onClick={() => setActiveTab('elibrary')}
            className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap text-sm md:text-base ${
              activeTab === 'elibrary'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            🌐 E-Library
          </button>
        </div>

        {/* STUDY MATERIALS TAB */}
        {activeTab === 'materials' && (
          <div className="space-y-4 md:space-y-6">
            {/* Info Card */}
            <Card className="shadow-soft bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
              <div className="p-3 md:p-4 lg:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-sm md:text-base lg:text-lg font-semibold text-slate-900 mb-1 md:mb-2">📚 Organized by Subject</h2>
                    <p className="text-xs md:text-sm lg:text-base text-slate-600">
                      All study materials are organized by subject and type for easy access. Download or view materials anytime!
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Materials Grid - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 md:gap-3 lg:gap-4">
              {materials.map((material) => (
                <Card
                  key={material.id}
                  className={`shadow-soft hover:shadow-medium transition-all duration-300 border ${getTypeColor(material.type)}`}
                >
                  <div className="p-2.5 md:p-3 lg:p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-3 lg:gap-4">
                      <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
                        <div className="p-1.5 md:p-2 lg:p-3 rounded-lg bg-white border border-slate-200 flex-shrink-0">
                          {getTypeIcon(material.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2 flex-wrap">
                            <h3 className="text-xs md:text-base lg:text-lg font-semibold text-slate-900 truncate">{material.title}</h3>
                            <Badge variant={material.type === 'Video' ? 'danger' : 'primary'} className="text-xs">
                              {material.type}
                            </Badge>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2 lg:gap-4 text-xs md:text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-slate-900 text-xs md:text-sm">{material.subject}</span>
                            </div>
                            <div className="hidden md:block">•</div>
                            <span>{material.size}</span>
                            <div className="hidden md:block">•</div>
                            <span>{material.uploadedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {/* Mobile: Icon button with text label below, positioned at end */}
                        <div className="flex md:hidden flex-col items-end gap-1">
                          <Button
                            onClick={() => console.log(`Downloading ${material.file}`)}
                            className="p-2 h-auto w-auto"
                            variant="premium"
                          >
                            <Download size={16} />
                          </Button>
                          <span className="text-xs font-medium text-slate-700">Download</span>
                        </div>
                        
                        {/* Desktop: Full button with icon and text inside */}
                        <Button
                          onClick={() => console.log(`Downloading ${material.file}`)}
                          className="hidden md:flex items-center gap-1 md:gap-2 text-xs md:text-sm lg:text-base"
                          variant="premium"
                        >
                          <Download size={16} />
                          <span>Download</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Help Card */}
            <Card className="shadow-soft">
              <div className="p-3 md:p-4 lg:p-6">
                <h2 className="text-sm md:text-base lg:text-lg font-semibold text-slate-900 mb-2 md:mb-3">Need Help?</h2>
                <p className="text-xs md:text-sm lg:text-base text-slate-600 mb-3 md:mb-4">
                  If you can't find a specific study material or need help downloading files, contact your teacher or send a message through the platform.
                </p>
                <Button className="w-full text-xs md:text-sm lg:text-base py-2 md:py-2.5 lg:py-3">Request Study Material</Button>
              </div>
            </Card>
          </div>
        )}

        {/* E-LIBRARY TAB */}
        {activeTab === 'elibrary' && (
          <div className="space-y-4 md:space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 md:top-3.5 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: '📖 All' },
                { value: 'textbook', label: '📗 Textbooks' },
                { value: 'journal', label: '📰 Journals' },
                { value: 'research', label: '🔬 Research' },
                { value: 'reference', label: '📕 Reference' },
              ].map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value as any)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium transition text-xs md:text-sm ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* E-Library Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredELibrary.map((book) => {
                const accessBadge = getAccessBadge(book.accessType);
                return (
                  <Card
                    key={book.id}
                    className={`shadow-soft hover:shadow-medium transition-all border ${getCategoryColor(book.category)}`}
                  >
                    <div className="p-4 md:p-5">
                      {/* Category Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={getCategoryBadgeColor(book.category) as any}>
                          {book.category.charAt(0).toUpperCase() + book.category.slice(1)}
                        </Badge>
                        <Badge variant={accessBadge.color as any} className="text-xs">
                          {accessBadge.text}
                        </Badge>
                      </div>

                      {/* Book Info */}
                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{book.author}</p>

                      {/* Subject & Year */}
                      <div className="flex flex-wrap gap-2 mb-3 text-xs">
                        <Badge variant="outline">{book.subject}</Badge>
                        <Badge variant="outline">{book.year}</Badge>
                      </div>

                      {/* Book Details */}
                      <div className="text-xs text-gray-600 space-y-1 mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5" />
                          <span>ISBN: {book.isbn}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{book.publisher} • {book.pages} pages</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs md:text-sm"
                          onClick={() => setViewingBook(book)}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          Details
                        </Button>
                        <Button
                          variant="premium"
                          size="sm"
                          className="flex-1 text-xs md:text-sm"
                          onClick={() => window.open(book.url, '_blank')}
                        >
                          <Globe className="w-3.5 h-3.5 mr-1" />
                          Access
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {filteredELibrary.length === 0 && (
              <Card className="text-center py-12 bg-gray-50">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No books found matching your search</p>
              </Card>
            )}
          </div>
        )}

        {/* Book Details Modal */}
        {viewingBook && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4" onClick={() => setViewingBook(null)}>
            <Card className="w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Book Details</h2>
                  <button
                    onClick={() => setViewingBook(null)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Book Title & Author */}
                  <div>
                    <p className="text-sm text-gray-600 uppercase mb-1">Title</p>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{viewingBook.title}</h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 uppercase mb-1">Author</p>
                    <p className="text-base text-gray-900">{viewingBook.author}</p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 uppercase mb-1">Category</p>
                      <Badge variant={getCategoryBadgeColor(viewingBook.category) as any}>
                        {viewingBook.category.charAt(0).toUpperCase() + viewingBook.category.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 uppercase mb-1">Access</p>
                      <Badge variant={getAccessBadge(viewingBook.accessType).color as any}>
                        {getAccessBadge(viewingBook.accessType).text}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 uppercase mb-1">ISBN</p>
                      <p className="text-base text-gray-900">{viewingBook.isbn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 uppercase mb-1">Published</p>
                      <p className="text-base text-gray-900">{viewingBook.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 uppercase mb-1">Publisher</p>
                      <p className="text-base text-gray-900">{viewingBook.publisher}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 uppercase mb-1">Pages</p>
                      <p className="text-base text-gray-900">{viewingBook.pages}</p>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <p className="text-sm text-gray-600 uppercase mb-2">Subject</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{viewingBook.subject}</Badge>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-3 pt-6 border-t border-gray-200 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1 text-sm"
                    onClick={() => setViewingBook(null)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="premium"
                    className="flex-1 text-sm"
                    onClick={() => {
                      window.open(viewingBook.url, '_blank');
                      setViewingBook(null);
                    }}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Open in E-Library
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
