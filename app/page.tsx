"use client";

import React, { useState, useEffect } from 'react';
import { Waves, Wind, Leaf, Sparkles } from 'lucide-react';

interface Theme {
    color: string;
    bg: string;
}

interface Themes {
    peace: Theme;
    acceptance: Theme;
    courage: Theme;
    wisdom: Theme;
}

export default function ExtendedSerenityPrayer() {
    const [activeView, setActiveView] = useState<string>('full');
    const [focusedLine, setFocusedLine] = useState<number | null>(null);
    const [breathingPhase, setBreathingPhase] = useState<string>('inhale');

    useEffect(() => {
        const breathingCycle = setInterval(() => {
            setBreathingPhase(prev => {
                if (prev === 'inhale') return 'hold';
                if (prev === 'hold') return 'exhale';
                return 'inhale';
            });
        }, 4000);
        return () => clearInterval(breathingCycle);
    }, []);

    const prayerLines = [
        { text: 'God, grant me the serenity', icon: Waves, theme: 'peace' as keyof Themes },
        { text: 'to accept the things I cannot change,', icon: Leaf, theme: 'acceptance' as keyof Themes },
        { text: 'courage to change the things I can,', icon: Sparkles, theme: 'courage' as keyof Themes },
        { text: 'and wisdom to know the difference.', icon: Wind, theme: 'wisdom' as keyof Themes },
    ];

    const extendedLines = [
        'Living one day at a time,',
        'enjoying one moment at a time,',
        'accepting hardships as the pathway to peace;',
        'taking, as He did, this sinful world as it is,',
        'not as I would have it;',
        'trusting that He will make all things right',
        'if I surrender to His will;',
        'that I may be reasonably happy in this life',
        'and supremely happy with Him forever in the next.'
    ];

    const themes: Themes = {
        peace: { color: '#7ec8e3', bg: 'rgba(126, 200, 227, 0.08)' },
        acceptance: { color: '#88c999', bg: 'rgba(136, 201, 153, 0.08)' },
        courage: { color: '#f4a261', bg: 'rgba(244, 162, 97, 0.08)' },
        wisdom: { color: '#b491c8', bg: 'rgba(180, 145, 200, 0.08)' }
    };

    const handleMouseEnterButton = (e: React.MouseEvent<HTMLButtonElement>, view: string) => {
        if (activeView !== view) {
            e.currentTarget.style.background = 'rgba(126, 200, 227, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(126, 200, 227, 0.3)';
        }
    };

    const handleMouseLeaveButton = (e: React.MouseEvent<HTMLButtonElement>, view: string) => {
        if (activeView !== view) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
            e.currentTarget.style.borderColor = 'rgba(126, 200, 227, 0.15)';
        }
    };

    const handleMouseEnterLine = (e: React.MouseEvent<HTMLDivElement>, theme: Theme) => {
        e.currentTarget.style.transform = 'translateX(8px)';
        e.currentTarget.style.boxShadow = `0 8px 30px ${theme.color}20`;
    };

    const handleMouseLeaveLine = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
    };

    const handleMouseEnterReflect = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (focusedLine !== index) {
            e.currentTarget.style.borderColor = 'rgba(126, 200, 227, 0.3)';
            e.currentTarget.style.transform = 'translateY(-4px)';
        }
    };

    const handleMouseLeaveReflect = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (focusedLine !== index) {
            e.currentTarget.style.borderColor = 'rgba(126, 200, 227, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(165deg, #f8fdf9 0%, #e8f4f8 30%, #f0f8f4 70%, #faf9f6 100%)',
            fontFamily: '"Lora", "Georgia", serif',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated breathing circle */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: breathingPhase === 'inhale' ? '800px' : breathingPhase === 'hold' ? '900px' : '700px',
                height: breathingPhase === 'inhale' ? '800px' : breathingPhase === 'hold' ? '900px' : '700px',
                background: 'radial-gradient(circle, rgba(126, 200, 227, 0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                transition: 'all 4s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'none',
                opacity: 0.6
            }} />

            {/* Floating decorative elements */}
            <div style={{
                position: 'fixed',
                top: '10%',
                right: '10%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(136, 201, 153, 0.12) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                animation: 'float 20s ease-in-out infinite',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'fixed',
                bottom: '15%',
                left: '15%',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(180, 145, 200, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                animation: 'float 25s ease-in-out infinite reverse',
                pointerEvents: 'none'
            }} />

            {/* Header */}
            <header style={{
                textAlign: 'center',
                padding: '3rem 2rem 2rem',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    display: 'inline-block',
                    padding: '1rem',
                    marginBottom: '1rem',
                    animation: 'fadeInScale 1.2s ease-out'
                }}>
                    <Waves size={40} strokeWidth={1.5} style={{
                        color: '#7ec8e3',
                        filter: 'drop-shadow(0 2px 4px rgba(126, 200, 227, 0.3))'
                    }} />
                </div>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                    fontWeight: '400',
                    margin: '0 0 0.5rem',
                    letterSpacing: '0.01em',
                    color: '#2d4a52',
                    animation: 'fadeInUp 1s ease-out 0.2s backwards',
                    fontFamily: '"Cormorant Garamond", serif'
                }}>
                    The Serenity Prayer
                </h1>
                <p style={{
                    color: '#5a7d87',
                    fontStyle: 'italic',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    animation: 'fadeInUp 1s ease-out 0.4s backwards'
                }}>
                    Reinhold Niebuhr
                </p>
            </header>

            {/* View Toggle */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                animation: 'fadeInUp 1s ease-out 0.6s backwards'
            }}>
                {['full', 'short', 'reflect'].map((view) => (
                    <button
                        key={view}
                        onClick={() => setActiveView(view)}
                        style={{
                            padding: '0.7rem 1.8rem',
                            background: activeView === view
                                ? 'linear-gradient(135deg, rgba(126, 200, 227, 0.15), rgba(136, 201, 153, 0.15))'
                                : 'rgba(255, 255, 255, 0.5)',
                            border: activeView === view
                                ? '2px solid rgba(126, 200, 227, 0.4)'
                                : '2px solid rgba(126, 200, 227, 0.15)',
                            color: activeView === view ? '#2d4a52' : '#5a7d87',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontFamily: 'inherit',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            transition: 'all 0.3s ease',
                            borderRadius: '25px',
                            fontWeight: activeView === view ? '600' : '400',
                            backdropFilter: 'blur(10px)'
                        }}
                        onMouseEnter={(e) => handleMouseEnterButton(e, view)}
                        onMouseLeave={(e) => handleMouseLeaveButton(e, view)}
                    >
                        {view === 'full' ? 'Full Prayer' : view === 'short' ? 'Short Version' : 'Reflect'}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <main style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '2rem 2rem 4rem',
                position: 'relative',
                zIndex: 1
            }}>
                {activeView === 'short' && (
                    <div style={{
                        textAlign: 'center',
                        animation: 'fadeIn 0.8s ease-out'
                    }}>
                        <div style={{
                            display: 'grid',
                            gap: '2rem',
                            marginTop: '2rem'
                        }}>
                            {prayerLines.map((line, index) => {
                                const Icon = line.icon;
                                const theme = themes[line.theme];
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            padding: '2rem 2.5rem',
                                            background: `linear-gradient(135deg, ${theme.bg}, rgba(255, 255, 255, 0.4))`,
                                            borderLeft: `4px solid ${theme.color}`,
                                            borderRadius: '0 12px 12px 0',
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                                            animation: `slideInRight 0.8s ease-out ${index * 0.15}s backwards`,
                                            backdropFilter: 'blur(10px)',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => handleMouseEnterLine(e, theme)}
                                        onMouseLeave={handleMouseLeaveLine}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1.5rem'
                                        }}>
                                            <Icon size={32} strokeWidth={1.5} style={{
                                                color: theme.color,
                                                flexShrink: 0
                                            }} />
                                            <p style={{
                                                fontSize: '1.5rem',
                                                margin: 0,
                                                color: '#2d4a52',
                                                lineHeight: '1.6',
                                                textAlign: 'left',
                                                fontWeight: '400'
                                            }}>
                                                {line.text}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeView === 'full' && (
                    <div style={{
                        animation: 'fadeIn 0.8s ease-out'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(248, 253, 249, 0.9))',
                            borderRadius: '20px',
                            padding: '3rem',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
                            border: '1px solid rgba(126, 200, 227, 0.2)',
                            backdropFilter: 'blur(20px)',
                            animation: 'scaleIn 1s ease-out 0.3s backwards'
                        }}>
                            <div style={{
                                fontSize: '1.6rem',
                                lineHeight: '2',
                                color: '#2d4a52',
                                marginBottom: '2rem',
                                paddingBottom: '2rem',
                                borderBottom: '1px solid rgba(126, 200, 227, 0.2)'
                            }}>
                                {prayerLines.map((line, index) => (
                                    <p key={index} style={{
                                        margin: '0.8rem 0',
                                        animation: `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`
                                    }}>
                                        {line.text}
                                    </p>
                                ))}
                            </div>
                            <div style={{
                                fontSize: '1.3rem',
                                lineHeight: '1.9',
                                color: '#4a6670',
                                fontStyle: 'italic'
                            }}>
                                {extendedLines.map((line, index) => (
                                    <p key={index} style={{
                                        margin: '0.7rem 0',
                                        animation: `fadeInUp 0.8s ease-out ${(prayerLines.length + index) * 0.08}s backwards`
                                    }}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeView === 'reflect' && (
                    <div style={{
                        animation: 'fadeIn 0.8s ease-out'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            marginBottom: '3rem'
                        }}>
                            <p style={{
                                fontSize: '1.1rem',
                                color: '#5a7d87',
                                maxWidth: '600px',
                                margin: '0 auto 3rem',
                                lineHeight: '1.8'
                            }}>
                                Click on each line to explore its meaning
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gap: '1.5rem'
                        }}>
                            {[
                                {
                                    line: 'God, grant me the serenity',
                                    reflection: 'Serenity is not the absence of struggle, but inner peace amid life\'s storms. It begins with acknowledging we need help beyond ourselves.'
                                },
                                {
                                    line: 'to accept the things I cannot change',
                                    reflection: 'Acceptance is not resignation—it\'s recognizing reality clearly. We release what we cannot control, freeing ourselves from futile resistance.'
                                },
                                {
                                    line: 'courage to change the things I can',
                                    reflection: 'True courage means taking responsibility for our choices and actions. It requires us to step forward even when we\'re afraid.'
                                },
                                {
                                    line: 'and wisdom to know the difference',
                                    reflection: 'Wisdom is the bridge between acceptance and courage. It helps us discern which battles to fight and which storms to weather with grace.'
                                }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setFocusedLine(focusedLine === index ? null : index)}
                                    style={{
                                        padding: '2rem',
                                        background: focusedLine === index
                                            ? 'linear-gradient(135deg, rgba(126, 200, 227, 0.12), rgba(136, 201, 153, 0.12))'
                                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(248, 253, 249, 0.7))',
                                        borderRadius: '16px',
                                        border: '2px solid',
                                        borderColor: focusedLine === index
                                            ? 'rgba(126, 200, 227, 0.4)'
                                            : 'rgba(126, 200, 227, 0.15)',
                                        cursor: 'pointer',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        animation: `fadeInUp 0.6s ease-out ${index * 0.15}s backwards`,
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: focusedLine === index
                                            ? '0 8px 30px rgba(126, 200, 227, 0.15)'
                                            : '0 4px 20px rgba(0, 0, 0, 0.04)'
                                    }}
                                    onMouseEnter={(e) => handleMouseEnterReflect(e, index)}
                                    onMouseLeave={(e) => handleMouseLeaveReflect(e, index)}
                                >
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        margin: '0 0 1rem 0',
                                        color: '#2d4a52',
                                        fontWeight: '500',
                                        transition: 'margin 0.4s ease',
                                        fontFamily: '"Cormorant Garamond", serif'
                                    }}>
                                        {item.line}
                                    </h3>
                                    <div style={{
                                        maxHeight: focusedLine === index ? '200px' : '0',
                                        overflow: 'hidden',
                                        transition: 'all 0.4s ease',
                                        opacity: focusedLine === index ? 1 : 0
                                    }}>
                                        <p style={{
                                            fontSize: '1.1rem',
                                            margin: '1rem 0 0 0',
                                            color: '#4a6670',
                                            lineHeight: '1.8',
                                            fontStyle: 'italic',
                                            paddingTop: '1rem',
                                            borderTop: '1px solid rgba(126, 200, 227, 0.2)'
                                        }}>
                                            {item.reflection}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer Quote */}
            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#7a9ca8',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                animation: 'fadeIn 1.5s ease-out 1s backwards'
            }}>
                "Grant me the serenity to accept, the courage to change, the wisdom to know"
            </footer>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }

        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
        </div>
    );
}