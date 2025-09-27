import { useTheme } from '@mui/material/styles'
import React from 'react'
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import HamburgerMenu from '../hamburgerMenu/HamburgerMenu'
import { Logo } from '../../Assets/SVGs'

const NavBar = () => {
  const theme = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      localStorage.clear()
      handleClose()
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
      localStorage.clear()
      handleClose()
      router.push('/')
    }
  }

  const isActive = (path: string): boolean => pathname === path

  return (
    <Box
      sx={{
        width: '100vw',
        height: { xs: '60px', sm: '70px', md: '80px', lg: '100px' },
        display: 'flex',
        position: 'sticky',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        px: { xs: '16px', sm: '20px', md: '0px' },
        my: { xs: '18px', md: '0px' },
        boxShadow: {
          md: '0px 4px 10px rgba(209, 213, 219, 0.5)'
        }
      }}
    >
      {/* Logo and Name */}
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          pl: { xs: '15px', md: '3.6vw' }
        }}
      >
        <Link href='/' aria-label='LinkedCreds - Business Home'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '0px',
              '&:hover': {
                opacity: 0.8
              }
            }}
          >
            <Logo />
          </Box>
        </Link>
        <Link href='/' aria-label='LinkedCreds - Business Home'>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: { xs: '16px', sm: '18px', md: '22px', lg: '24px' },
              color: theme.palette.t3DarkSlateBlue,
              fontFamily: 'inter',
              '&:hover': {
                opacity: 0.8
              }
            }}
          >
            LinkedCreds - Business
          </Typography>
        </Link>
      </Box>
      <Box sx={{ width: { xs: '15px', md: '0vw' } }}></Box>

      {/* Navigation Links and Sign Button */}
      <Box
        sx={{
          width: '65%',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: session ? 'space-between' : 'flex-end',
          mr: { xs: '15px', md: '3.6vw' },
          gap: { md: '1.5vw', lg: '3.9vw' },
          textWrap: 'nowrap'
        }}
      >
        {session && (
          <>
            <Link href='/newcredential' passHref>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: { md: '13px', lg: '16px' },
                    fontWeight: isActive('/skillform') ? '600' : '400',
                    color: isActive('/skillform')
                      ? '#003FE0'
                      : theme.palette.t3DarkSlateBlue,
                    cursor: 'pointer'
                  }}
                >
                  Add a New Credential
                </Typography>
                {isActive('/skillform') && (
                  <Box
                    sx={{
                      height: '2px',
                      width: '100%',
                      mt: '5px',
                      backgroundColor: '#003FE0'
                    }}
                  />
                )}
              </Box>
            </Link>
            <Link href='/credentialImportForm' passHref>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: { md: '13px', lg: '16px' },
                    fontWeight: isActive('/credentialImportForm') ? '600' : '400',
                    color: isActive('/credentialImportForm')
                      ? '#003FE0'
                      : theme.palette.t3DarkSlateBlue,
                    cursor: 'pointer'
                  }}
                >
                  Import Skill Credential
                </Typography>
                {isActive('/credentialImportForm') && (
                  <Box
                    sx={{
                      height: '2px',
                      width: '100%',
                      mt: '5px',
                      backgroundColor: '#003FE0'
                    }}
                  />
                )}
              </Box>
            </Link>
            <Link href='/claims' passHref>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: { md: '13px', lg: '16px' },
                    fontWeight: isActive('/claims') ? '600' : '400',
                    color: isActive('/claims')
                      ? '#003FE0'
                      : theme.palette.t3DarkSlateBlue,
                    cursor: 'pointer'
                  }}
                >
                  My Skills
                </Typography>
                {isActive('/claims') && (
                  <Box
                    sx={{
                      height: '2px',
                      width: '100%',
                      mt: '5px',
                      backgroundColor: '#003FE0'
                    }}
                  />
                )}
              </Box>
            </Link>
            <Link href='/analytics' passHref>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: { md: '13px', lg: '16px' },
                    fontWeight: isActive('/analytics') ? '600' : '400',
                    color: isActive('/analytics')
                      ? '#003FE0'
                      : theme.palette.t3DarkSlateBlue,
                    cursor: 'pointer'
                  }}
                >
                  Analytics
                </Typography>
                {isActive('/analytics') && (
                  <Box
                    sx={{
                      height: '2px',
                      width: '100%',
                      mt: '5px',
                      backgroundColor: '#003FE0'
                    }}
                  />
                )}
              </Box>
            </Link>
            <Link href='/help' passHref>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: { md: '13px', lg: '16px' },
                    fontWeight: isActive('/help') ? '600' : '400',
                    color: isActive('/help') ? '#003FE0' : theme.palette.t3DarkSlateBlue,
                    cursor: 'pointer'
                  }}
                >
                  Help
                </Typography>
                {isActive('/help') && (
                  <Box
                    sx={{
                      height: '2px',
                      width: '100%',
                      mt: '5px',
                      backgroundColor: '#003FE0'
                    }}
                  />
                )}
              </Box>
            </Link>
            {/*<Link href='/fullanalytics' passHref>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: isActive('/fullanalytics') ? '600' : '400',
                    color: isActive('/fullanalytics')
                      ? '#003FE0'
                      : theme.palette.t3DarkSlateBlue,
                    cursor: 'pointer'
                  }}
                >
                  Global Analytics
                </Typography>
                {isActive('/fullanalytics') && (
                  <Box
                    sx={{
                      height: '2px',
                      width: '100%',
                      mt: '5px',
                      backgroundColor: '#003FE0'
                    }}
                  />
                )}
              </Box>
            </Link>*/}

            {/* Uncomment these links when needed */}
            {/* 
            <Link href='/about' passHref>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: isActive('/about') ? '600' : '400',
                    color: isActive('/about') ? '#003FE0' : theme.palette.t3DarkSlateBlue,
                    cursor: 'pointer'
                  }}
                >
                  About LinkedCreds - Business
                </Typography>
                {isActive('/about') && (
                  <Box sx={{ height: '2px', width: '100%', mt: '5px', backgroundColor: '#003FE0' }} />
                )}
              </Box>
            </Link>
            <Link href='/support' passHref>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: isActive('/support') ? '600' : '400',
                    color: isActive('/support') ? '#003FE0' : theme.palette.t3DarkSlateBlue,
                    cursor: 'pointer'
                  }}
                >
                  Support
                </Typography>
                {isActive('/support') && (
                  <Box sx={{ height: '2px', width: '100%', mt: '5px', backgroundColor: '#003FE0' }} />
                )}
              </Box>
            </Link>
            */}
          </>
        )}

        {/* Sign In/Out Button */}
        {session ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar
              src={session.user?.image ?? ''}
              alt={session.user?.name || 'User Avatar'}
              sx={{
                width: { md: 32, lg: 40 },
                height: { md: 32, lg: 40 }
              }}
            />
            <Typography
              sx={{
                color: theme.palette.t3DarkSlateBlue,
                fontWeight: '500',
                fontSize: { md: '14px', lg: '16px' },
                display: { md: 'none', xl: 'block' }
              }}
            >
              {session.user?.name}
            </Typography>
            <IconButton
              aria-label='more'
              id='long-button'
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleClick}
              sx={{
                padding: { md: '4px', lg: '8px' },
                '&:hover': {
                  backgroundColor: 'rgba(0, 63, 224, 0.04)'
                }
              }}
            >
              <MoreVertIcon sx={{ fontSize: { md: '18px', lg: '24px' } }} />
            </IconButton>
            <Menu
              id='long-menu'
              MenuListProps={{
                'aria-labelledby': 'long-button'
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            sx={{
              width: { md: '100px', lg: '148px' },
              height: { md: '32px', lg: '40px' },
              fontFamily: 'roboto',
              fontSize: { md: '14px', lg: '16px' },
              fontWeight: '500',
              lineHeight: '20px',
              textAlign: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: theme.palette.t3ButtonBlue,
                opacity: 0.9
              }
            }}
            variant='actionButton'
            onClick={() => signIn('google')}
          >
            Sign In
          </Button>
        )}
      </Box>

      {/* Small Screen - Hamburger Menu */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          pr: { xs: '16px', sm: '20px' }
        }}
      >
        <HamburgerMenu aria-label='Open menu' />
      </Box>
    </Box>
  )
}

export default NavBar
