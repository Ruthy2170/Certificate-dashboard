import { Award, Calendar, Download, CheckCircle2, Filter, Share2, Linkedin, Twitter, Facebook, Link } from 'lucide-react';
import { useState } from 'react';

const certifications = [
  {
    id: 1,
    name: 'Advanced Web Development',
    organization: 'Tech Academy',
    completionDate: 'February 28, 2026',
    status: 'completed',
    learnerName: 'Ruth',
    category: 'Development',
  },
  {
    id: 2,
    name: 'Cloud Architecture Professional',
    organization: 'Cloud Certification Board',
    completionDate: 'January 15, 2026',
    status: 'completed',
    learnerName: 'Ruth',
    category: 'Cloud',
  },
  {
    id: 3,
    name: 'UX Design Specialist',
    organization: 'Design Institute',
    completionDate: 'March 2, 2026',
    status: 'completed',
    learnerName: 'Ruth',
    category: 'Design',
  },
  {
    id: 4,
    name: 'Agile Project Management',
    organization: 'PMI',
    completionDate: 'December 10, 2025',
    status: 'completed',
    learnerName: 'Ruth',
    category: 'Management',
  },
];

export default function CertificatesPage() {
  const [filter, setFilter] = useState('all');
  const [shareMenuOpen, setShareMenuOpen] = useState<number | null>(null);

  const handleDownloadCertificate = (certName: string) => {
    alert(`Downloading certificate: ${certName}`);
  };

  const handleShareToLinkedIn = (cert: typeof certifications[0]) => {
    const text = `I'm excited to share that I've earned my ${cert.name} certification from ${cert.organization}! 🎓`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=600');
    setShareMenuOpen(null);
  };

  const handleShareToTwitter = (cert: typeof certifications[0]) => {
    const text = `I'm excited to share that I've earned my ${cert.name} certification from ${cert.organization}! 🎓`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=600');
    setShareMenuOpen(null);
  };

  const handleShareToFacebook = (cert: typeof certifications[0]) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=600');
    setShareMenuOpen(null);
  };

  const handleCopyLink = (cert: typeof certifications[0]) => {
    const certificateUrl = `${window.location.origin}/certificates/${cert.id}`;
    navigator.clipboard.writeText(certificateUrl).then(() => {
      alert('Certificate link copied to clipboard!');
      setShareMenuOpen(null);
    });
  };

  const filteredCerts = filter === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.category.toLowerCase() === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">My Certifications</h1>
        <p className="text-gray-600">View and download all your earned certificates</p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <Award className="size-6 text-white" />
            </div>
          </div>
          <p className="mb-1 text-sm font-medium text-purple-100">Total Certificates</p>
          <p className="text-3xl font-bold text-white">{certifications.length}</p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <CheckCircle2 className="size-6 text-white" />
            </div>
          </div>
          <p className="mb-1 text-sm font-medium text-purple-100">Completed</p>
          <p className="text-3xl font-bold text-white">{certifications.filter(c => c.status === 'completed').length}</p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <Calendar className="size-6 text-white" />
            </div>
          </div>
          <p className="mb-1 text-sm font-medium text-purple-100">This Year</p>
          <p className="text-3xl font-bold text-white">{certifications.filter(c => c.completionDate.includes('2026')).length}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-6 flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
        <Filter className="size-5 text-gray-500" />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('development')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              filter === 'development'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Development
          </button>
          <button
            onClick={() => setFilter('cloud')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              filter === 'cloud'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cloud
          </button>
          <button
            onClick={() => setFilter('design')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              filter === 'design'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Design
          </button>
          <button
            onClick={() => setFilter('management')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              filter === 'management'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Management
          </button>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            className="group rounded-xl border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 transition-all hover:border-blue-200 hover:shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <Award className="size-7 text-white" />
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                ✓ Completed
              </span>
            </div>
            <h3 className="mb-2 font-bold text-gray-900">{cert.name}</h3>
            <p className="mb-2 text-sm font-medium text-blue-600">Awarded to: {cert.learnerName}</p>
            <p className="mb-2 text-sm font-medium text-gray-600">{cert.organization}</p>
            <div className="mb-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
              {cert.category}
            </div>
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="size-4" />
              {cert.completionDate}
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                onClick={() => handleDownloadCertificate(cert.name)}
              >
                <Download className="size-4" />
                Download Certificate
              </button>
              
              {/* Share Button with Dropdown */}
              <div className="relative">
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-600 transition-all hover:border-blue-300 hover:bg-blue-50"
                  onClick={() => setShareMenuOpen(shareMenuOpen === cert.id ? null : cert.id)}
                >
                  <Share2 className="size-4" />
                  Share Certificate
                </button>
                
                {/* Share Dropdown Menu */}
                {shareMenuOpen === cert.id && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShareMenuOpen(null)}
                    />
                    
                    {/* Menu */}
                    <div className="absolute right-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                      <button
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50"
                        onClick={() => handleShareToLinkedIn(cert)}
                      >
                        <div className="flex size-8 items-center justify-center rounded-lg bg-[#0077B5]">
                          <Linkedin className="size-4 text-white" />
                        </div>
                        <span>Share on LinkedIn</span>
                      </button>
                      
                      <button
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50"
                        onClick={() => handleShareToTwitter(cert)}
                      >
                        <div className="flex size-8 items-center justify-center rounded-lg bg-[#1DA1F2]">
                          <Twitter className="size-4 text-white" />
                        </div>
                        <span>Share on Twitter</span>
                      </button>
                      
                      <button
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50"
                        onClick={() => handleShareToFacebook(cert)}
                      >
                        <div className="flex size-8 items-center justify-center rounded-lg bg-[#1877F2]">
                          <Facebook className="size-4 text-white" />
                        </div>
                        <span>Share on Facebook</span>
                      </button>
                      
                      <button
                        className="flex w-full items-center gap-3 border-t border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        onClick={() => handleCopyLink(cert)}
                      >
                        <div className="flex size-8 items-center justify-center rounded-lg bg-gray-100">
                          <Link className="size-4 text-gray-600" />
                        </div>
                        <span>Copy Link</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCerts.length === 0 && (
        <div className="rounded-xl bg-white p-12 text-center shadow-sm">
          <Award className="mx-auto mb-4 size-16 text-gray-300" />
          <p className="text-gray-600">No certificates found in this category.</p>
        </div>
      )}
    </div>
  );
}