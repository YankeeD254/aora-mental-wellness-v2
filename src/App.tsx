import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ApproachSection } from './components/ApproachSection';
import { ServicesSection } from './components/ServicesSection';
import { WellnessTrackerVisualizer } from './components/WellnessTrackerVisualizer';
import { TherapistSpotlight } from './components/TherapistSpotlight';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { VideoStoryModal } from './components/VideoStoryModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ToastContainer } from './components/Toast';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ServiceProgram, ApproachTab, ToastMessage } from './types';

export default function App() {
  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingFocusArea, setBookingFocusArea] = useState<string>('Individual Therapy');
  const [bookingTherapistId, setBookingTherapistId] = useState<string>('');
  
  const [isVideoStoryOpen, setIsVideoStoryOpen] = useState<boolean>(false);
  
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceProgram | null>(null);
  const [selectedApproachDetail, setSelectedApproachDetail] = useState<ApproachTab | null>(null);

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss toast after 5.5s
    setTimeout(() => {
      removeToast(id);
    }, 5500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenBooking = (focusArea?: string, therapistId?: string) => {
    if (focusArea) setBookingFocusArea(focusArea);
    if (therapistId) setBookingTherapistId(therapistId);
    setIsBookingOpen(true);
  };

  const handleOpenStory = () => {
    setIsVideoStoryOpen(true);
  };

  const handleSelectServiceDetail = (service: ServiceProgram) => {
    setSelectedApproachDetail(null);
    setSelectedServiceDetail(service);
  };

  const handleSelectApproachDetail = (approach: ApproachTab) => {
    setSelectedServiceDetail(null);
    setSelectedApproachDetail(approach);
  };

  const handleCloseDetailModal = () => {
    setSelectedServiceDetail(null);
    setSelectedApproachDetail(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col relative overflow-x-hidden selection:bg-[#DDD6FE] selection:text-[#4C1D95]">
      {/* Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenStory={handleOpenStory}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onOpenStory={handleOpenStory}
        />

        {/* Our Approach (Dark Section) */}
        <ApproachSection
          onOpenBooking={handleOpenBooking}
          onSelectApproachDetail={handleSelectApproachDetail}
        />

        {/* Services & Programs */}
        <ServicesSection
          onOpenBooking={handleOpenBooking}
          onSelectServiceDetail={handleSelectServiceDetail}
        />

        {/* Interactive Biomarker & Wellness Compass */}
        <WellnessTrackerVisualizer
          onOpenBooking={handleOpenBooking}
        />

        {/* Clinical Team Spotlight */}
        <TherapistSpotlight
          onOpenBooking={handleOpenBooking}
        />

        {/* Patient Outcomes & Testimonials */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer & Newsletter Lead Gen */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenStory={handleOpenStory}
        onSuccessToast={(title, msg) => addToast(title, msg, 'success')}
      />

      {/* Modals and Overlays */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialFocusArea={bookingFocusArea}
        initialTherapistId={bookingTherapistId}
        onSuccessToast={(title, msg) => addToast(title, msg, 'success')}
      />

      <VideoStoryModal
        isOpen={isVideoStoryOpen}
        onClose={() => setIsVideoStoryOpen(false)}
        onOpenBooking={() => handleOpenBooking('Story Inquiry')}
      />

      <ServiceDetailModal
        service={selectedServiceDetail}
        approach={selectedApproachDetail}
        onClose={handleCloseDetailModal}
        onBook={(title) => {
          handleCloseDetailModal();
          handleOpenBooking(title);
        }}
      />

      {/* Floating WhatsApp Quick Action */}
      <FloatingWhatsApp />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
