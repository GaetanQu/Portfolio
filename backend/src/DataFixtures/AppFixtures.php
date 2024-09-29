<?php

namespace App\DataFixtures;

use App\Entity\Message;
use App\Entity\Project;
use App\Entity\Tag;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use function Symfony\Component\Clock\now;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $userPasswordHasher;

    public function __construct(UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->userPasswordHasher = $userPasswordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        # Création de l'utilisateur unique
        $user = new User;
        $user->setUsername('admin');
        $user->setPassword($this->userPasswordHasher->hashPassword($user, '0000'));
        $manager->persist($user);

        # Création des tags
        $tags = [];
        for ($i=0; $i < 11; $i++) { 
            $tag = new Tag;
            $tag->setName('Tag '.$i);
            $manager->persist($tag);
            $tags[] = $tag;
        }

        # Création des projets
        for ($i=0; $i < 6; $i++) { 
            $project = new Project;
            $project->setTitle("Projet ".$i);
            $project->setDescription("Desciprion du projet ".$i);
            $project->setImagesFolder("/dossier/des/images/du/projet/".$i);
            for ($j=0; $j < rand(0, 3); $j++) { 
                $project->addTag($tags[rand(0,count($tags)-1)]);
            }
            $project->setCreatedAt(new DateTimeImmutable());
            $project->setUpdatedAt(new DateTimeImmutable());
            $manager->persist($project);
        }

        # Création de messages
        for ($i=0; $i < 4; $i++) { 
            $message = new Message;
            $message->setSenderName('Client '.$i);
            $message->setEmail('John'.$i.'@Doe.example');
            $message->setMessage('Lorem ipsum dolor sit amet, consectetur etc jsp moi je connais pas le lorem ipsum à 100%');
            $message->setCreatedAt(new DateTimeImmutable());
            $manager->persist($message);
        }

        $manager->flush();
    }
}