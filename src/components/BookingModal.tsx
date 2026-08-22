import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, ArrowLeft, Calendar, Clock, User, Mail, Phone, Video, MapPin, MessageSquare, Sparkles, Shield, Heart, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { THERAPISTS } from '../data/wellnessData';
import { BookingFormData } from '../types';
import { submitBookingInquiry, createBookingMailtoLink, createBookingWhatsAppLink, EMAIL_REGEX, PHONE_REGEX } from '../services/emailService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFocusArea?: string;
  initialTherapistId?: string;
  onSuccessToast: (title: string, message: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialFocusArea = 'Individual Therapy',
  initialTherapistId = '',
  onSuccessToast,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  const focusOptions = [
    'Individual Therapy (Anxiety, Stress, Trauma)',
    'Couples & Relationship Counseling',
    'Group Therapy & Mindful Circles',
    'Workshops & Executive Sleep Intensives',
  ];

  const timeSlots = [
    '09:00 AM (EAT / Nairobi)',
    '11:30 AM (EAT / Nairobi)',
    '02:00 PM (EAT / Nairobi)',
    '04:30 PM (EAT / Nairobi)',
    '06:00 PM (EAT / Nairobi)',
  ];

  const [formData, setFormData] = useState<BookingFormData>({
    focusArea: initialFocusArea || 'Individual Therapy',
    preferredTherapistId: initialTherapistId || THERAPISTS[0].id,
    selectedDate: '2026-08-25',
    selectedTimeSlot: '11:30 AM (EAT / Nairobi)',
    sessionType: 'video',
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Synchronize initial values when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitting(false);
      setIsSuccess(false);
      setErrors({});
      if (initialFocusArea) {
        setFormData((prev) => ({ ...prev, focusArea: initialFocusArea }));
      }
      if (initialTherapistId) {
        setFormData((prev) => ({ ...prev, preferredTherapistId: initialTherapistId }));
      }
    }
  }, [isOpen, initialFocusArea, initialTherapistId]);

  // Esc key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  // Calming breath animation timer during submission
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitting) {
      setBreathPhase('Inhale');
      timer = setTimeout(() => {
        setBreathPhase('Hold');
        setTimeout(() => {
          setBreathPhase('Exhale');
        }, 500);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [isSubmitting]);

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter a contact phone number.';
    } else if (!PHONE_REGEX.test(formData.phone.trim().replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (e.g. 0735 773392 or +254 735 773 392).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 3) {
      if (validateStep3()) {
        handleSubmitBooking();
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    const therapistObj = THERAPISTS.find((t) => t.id === formData.preferredTherapistId) || THERAPISTS[0];

    try {
      await submitBookingInquiry({
        focusArea: formData.focusArea,
        therapistName: therapistObj.name,
        selectedDate: formData.selectedDate,
        selectedTimeSlot: formData.selectedTimeSlot,
        sessionType: formData.sessionType,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.notes,
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A78BFA', '#C4B5FD', '#A7F3D0', '#FEF08A'],
        });
      } catch (err) {
        console.error(err);
      }

      onSuccessToast(
        'Consultation Request Transmitted!',
        `Your request has been delivered to Irene Omondi (alexandernathan.ceo@outlook.com). A confirmation has been sent to ${formData.email}.`
      );
    } catch (err: any) {
      setIsSubmitting(false);
      setErrors({ submit: err?.message || 'Failed to submit booking. Please try again or WhatsApp 0735 773392.' });
    }
  };

  if (!isOpen) return null;

  const selectedTherapist = THERAPISTS.find((t) => t.id === formData.preferredTherapistId) || THERAPISTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden relative my-8"
        id="booking-modal-container"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50/50 p-6 sm:p-8 border-b border-purple-100/70 flex items-center justify-between relative">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step {step} of 3 • Intake Assessment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
              {isSuccess ? 'Journey Scheduled' : 'Begin Your Healing Journey'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {/* Submitting Loading State with Calming Breath Guide */}
          {isSubmitting && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: breathPhase === 'Inhale' ? [1, 1.4] : breathPhase === 'Hold' ? 1.4 : [1.4, 1],
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full bg-[#A78BFA]/30 flex items-center justify-center text-purple-900"
                >
                  <div className="w-16 h-16 rounded-full bg-[#A78BFA] text-white flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 animate-pulse" />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-2">
                <div className="text-lg font-bold text-gray-900">
                  {breathPhase}... Calibrating Your Care Plan
                </div>
                <p className="text-xs text-gray-500 max-w-sm">
                  Connecting with {selectedTherapist.name} and generating your HIPAA-secure intake token.
                </p>
              </div>
            </div>
          )}

          {/* Success Screen */}
          {isSuccess && !isSubmitting && (
            <div className="py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="text-center space-y-2">
                <h4 className="text-2xl font-bold text-gray-900">Your Consultation is Confirmed!</h4>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  We're honored to accompany you. A calendar invitation and intake summary have been routed to <span className="font-semibold text-purple-900">{formData.email}</span> and lead psychologist Irene Omondi (<span className="font-medium text-gray-800">alexandernathan.ceo@outlook.com</span>).
                </p>
              </div>

              {/* Consultation Summary Card */}
              <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-5 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                  <span className="text-gray-500">Care Focus</span>
                  <span className="font-semibold text-gray-900">{formData.focusArea}</span>
                </div>
                <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                  <span className="text-gray-500">Therapist</span>
                  <span className="font-semibold text-gray-900">{selectedTherapist.name}</span>
                </div>
                <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                  <span className="text-gray-500">Date & Time</span>
                  <span className="font-semibold text-gray-900">{formData.selectedDate} at {formData.selectedTimeSlot}</span>
                </div>
                <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                  <span className="text-gray-500">Format</span>
                  <span className="font-semibold text-purple-800 uppercase">{formData.sessionType} Session</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Email Delivery</span>
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Dispatched to {formData.email}</span>
                  </span>
                </div>
              </div>

              {/* Instant Verification & Communication CTAs */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={createBookingMailtoLink({
                      focusArea: formData.focusArea,
                      therapistName: selectedTherapist.name,
                      selectedDate: formData.selectedDate,
                      selectedTimeSlot: formData.selectedTimeSlot,
                      sessionType: formData.sessionType,
                      fullName: formData.fullName,
                      email: formData.email,
                      phone: formData.phone,
                      message: formData.notes,
                    })}
                    className="w-full bg-purple-100/80 hover:bg-purple-200/80 text-purple-950 font-semibold py-2.5 px-4 rounded-full text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-purple-700" />
                    <span>Open Email Summary</span>
                  </a>

                  <a
                    href={createBookingWhatsAppLink({
                      focusArea: formData.focusArea,
                      therapistName: selectedTherapist.name,
                      selectedDate: formData.selectedDate,
                      selectedTimeSlot: formData.selectedTimeSlot,
                      sessionType: formData.sessionType,
                      fullName: formData.fullName,
                      email: formData.email,
                      phone: formData.phone,
                      message: formData.notes,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-4 rounded-full text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Direct Receipt</span>
                  </a>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-[#1A1A1A] hover:bg-black text-white px-8 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-md"
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form Step 1: Care Focus */}
          {!isSubmitting && !isSuccess && step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  What primary area would you like to explore first?
                </label>
                <p className="text-xs text-gray-500 mb-4">
                  Select the focal point most resonant with your current emotional state.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {focusOptions.map((option) => {
                    const isSelected = formData.focusArea === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, focusArea: option })}
                        className={`p-4 rounded-2xl text-left text-xs sm:text-sm font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-purple-50 border-[#A78BFA] text-purple-900 ring-2 ring-[#A78BFA]/30'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#A78BFA] shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Format Preference */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Preferred Session Format
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: 'video', label: 'HD Telehealth', icon: Video },
                    { type: 'in-person', label: '5th Ave Nairobi', icon: MapPin },
                    { type: 'chat', label: 'Async Audio/Chat', icon: MessageSquare },
                  ].map((fmt) => {
                    const isSelected = formData.sessionType === fmt.type;
                    const Icon = fmt.icon;
                    return (
                      <button
                        key={fmt.type}
                        type="button"
                        onClick={() => setFormData({ ...formData, sessionType: fmt.type as 'video' | 'in-person' | 'chat' })}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? 'bg-purple-50 border-[#A78BFA] text-purple-900'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-purple-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#A78BFA]" />
                        <span className="text-xs font-semibold">{fmt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Form Step 2: Therapist & Timing */}
          {!isSubmitting && !isSuccess && step === 2 && (
            <div className="space-y-6">
              {/* Select Therapist */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Select Therapist Specialist
                </label>
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {THERAPISTS.map((therapist) => {
                    const isSelected = formData.preferredTherapistId === therapist.id;
                    return (
                      <div
                        key={therapist.id}
                        onClick={() => setFormData({ ...formData, preferredTherapistId: therapist.id })}
                        className={`p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-purple-50 border-[#A78BFA] ring-2 ring-[#A78BFA]/30'
                            : 'bg-white border-gray-200 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={therapist.avatar}
                            alt={therapist.name}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
                            }}
                            className="w-11 h-11 rounded-xl object-cover"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-gray-900">{therapist.name}</h4>
                            <p className="text-[11px] text-purple-700 font-medium">{therapist.title}</p>
                            <p className="text-[10px] text-gray-500">{therapist.specialties.join(' • ')}</p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-[#A78BFA] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span>Select Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    min="2026-08-22"
                    value={formData.selectedDate}
                    onChange={(e) => setFormData({ ...formData, selectedDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#A78BFA] text-xs sm:text-sm text-gray-800 font-medium"
                    id="booking-date-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span>Select Time Slot</span>
                  </label>
                  <select
                    value={formData.selectedTimeSlot}
                    onChange={(e) => setFormData({ ...formData, selectedTimeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#A78BFA] text-xs sm:text-sm text-gray-800 font-medium bg-white"
                    id="booking-time-select"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Form Step 3: Contact Details */}
          {!isSubmitting && !isSuccess && step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>Full Legal / Preferred Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Clara Montgomery"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm text-gray-800 focus:outline-none ${
                    errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200 focus:border-[#A78BFA]'
                  }`}
                  id="booking-name-input"
                />
                {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>Email Address (for confidential link)</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm text-gray-800 focus:outline-none ${
                    errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200 focus:border-[#A78BFA]'
                  }`}
                  id="booking-email-input"
                />
                {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>Phone Number (SMS appointment reminders)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm text-gray-800 focus:outline-none ${
                    errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200 focus:border-[#A78BFA]'
                  }`}
                  id="booking-phone-input"
                />
                {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Optional Reflection / Focus Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Share anything you'd like your therapist to know beforehand..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#A78BFA] text-xs text-gray-800"
                  id="booking-notes-input"
                />
              </div>

              {errors.submit && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
                  {errors.submit}
                </div>
              )}

              <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-100 flex items-center gap-2 text-[11px] text-purple-900">
                <Shield className="w-4 h-4 text-purple-700 shrink-0" />
                <span>Protected by HIPAA end-to-end medical encryption. Sent directly to Irene Omondi (alexandernathan.ceo@outlook.com).</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {!isSubmitting && !isSuccess && (
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-[#A78BFA] hover:bg-[#9270f2] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
              id="booking-next-btn"
            >
              <span>{step === 3 ? 'Confirm & Reserve Session' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
