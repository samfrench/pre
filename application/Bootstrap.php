<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	protected function _initActionHelpers()
    {
        Zend_Controller_Action_HelperBroker::addPath(
            APPLICATION_PATH . '/controllers/helpers',
            'Application_Controller_Helper_'
        );
    }

	protected function _initRewrite()
    {
        $front = Zend_Controller_Front::getInstance();
        $router = $front->getRouter();

        $config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/routes.ini', 'production');
        $router->addConfig($config, 'routes');
    }
}

